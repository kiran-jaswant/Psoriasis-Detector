from dataclasses import dataclass
from typing import Dict, Any, List, Tuple
import pandas as pd
import numpy as np

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

# -----------------------------
# Recommendation texts
# -----------------------------
REC_LIBRARY = {
    "diet:anti_inflammatory_plate": "Favor fruits/veg, legumes, whole grains, nuts, omega-3 sources.",
    "diet:limit_trigger_foods": "Limit ultra-processed, high-sugar, deep-fried foods.",
    "diet:hydration": "Aim ~2–3 L water/day (adjust for climate/activity).",
    "diet:alcohol_reduce": "Avoid or minimize alcohol; it can trigger flares.",
    "diet:weight_management": "Maintain healthy weight; gradual fat loss can help.",
    "skin:lukewarm_showers": "Short, lukewarm showers; avoid hot water.",
    "skin:bland_moisturizer": "Fragrance-free thick emollient within 3 minutes of bathing.",
    "skin:gentle_cleanser": "Use mild fragrance-free cleansers; avoid harsh soaps.",
    "skin:sunscreen": "Broad-spectrum sunscreen on exposed skin.",
    "cloth:soft_cotton": "Soft, breathable cotton; avoid rough wool/tight clothes.",
    "cloth:loose_layers": "Loose layers reduce friction and sweating.",
    "scalp:gentle_shampoo": "Gentle, fragrance-free shampoo; avoid scratching.",
    "trig:fragrance_free": "Fragrance-free skincare & detergents.",
    "trig:humidifier": "Humidifier in dry/cold climates.",
    "trig:stress_mgmt": "Daily stress reduction (breathing, meditation, yoga).",
    "trig:smoking_cessation": "Avoid smoking/vaping; seek cessation support.",
    "habit:sleep": "Aim 7–9 hours, regular schedule.",
    "habit:regular_exercise": "Regular moderate exercise supports inflammation control.",
    "follow:mild": "Mild: monitor and continue consistent skin care; see derm if no improvement.",
    "follow:moderate": "Moderate: lifestyle + consistent emollients; consider earlier derm review.",
    "follow:severe": "Severe: please see a dermatologist promptly."
}

# -----------------------------
# Rule layer
# -----------------------------
def rule_engine(features: Dict[str, Any], severity: str) -> List[Tuple[str, float, str]]:
    f = lambda k, default=None: features.get(k, default)
    recs = [
        ("skin:lukewarm_showers", 0.6, "General barrier protection."),
        ("skin:bland_moisturizer", 0.8, "Emollients help barrier & itch."),
        ("skin:gentle_cleanser", 0.6, "Avoid irritant dermatitis."),
        ("diet:anti_inflammatory_plate", 0.6, "Anti-inflammatory base."),
        ("diet:hydration", 0.6, "Hydration supports barrier."),
        ("cloth:soft_cotton", 0.6, "Less friction/irritation."),
        ("cloth:loose_layers", 0.5, "Reduces sweat/friction."),
        ("habit:sleep", 0.5, "Recovery & immune balance."),
        ("habit:regular_exercise", 0.4, "General benefit."),
        ("trig:fragrance_free", 0.7, "Minimize irritants."),
    ]

    if severity == "mild":
        recs.append(("follow:mild", 0.5, "Image severity: mild."))
    elif severity == "moderate":
        recs += [("follow:moderate", 0.7, "Image severity: moderate."),
                 ("skin:sunscreen", 0.4, "Helpful for exposed areas.")]
    elif severity == "severe":
        recs += [("follow:severe", 0.95, "Image severity: severe."),
                 ("skin:sunscreen", 0.4, "Helpful for exposed areas.")]

    if f("alcohol") in ("yes", True, "y", 1):
        recs.append(("diet:alcohol_reduce", 0.7, "Form: alcohol=yes."))
    if f("smoking") in ("yes", True, "y", 1):
        recs.append(("trig:smoking_cessation", 0.8, "Form: smoking=yes."))
    if f("scalp_involved") in ("yes", True, "y", 1):
        recs.append(("scalp:gentle_shampoo", 0.6, "Form: scalp involved."))
    if f("climate") in ("cold", "dry"):
        recs.append(("trig:humidifier", 0.6, "Dry/cold climate."))
    if f("harsh_soap_use") in ("yes", True, "y", 1):
        recs.append(("skin:gentle_cleanser", 0.8, "Harsh soaps reported."))
    bmi = f("bmi")
    if (isinstance(bmi, (int, float)) and bmi is not None and bmi >= 27) or f("weight_concern") in ("yes", True, "y", 1):
        recs.append(("diet:weight_management", 0.6, "Higher BMI/weight concern."))
    sl = f("stress_level")
    if isinstance(sl, (int, float)) and sl is not None and sl >= 6:
        recs.append(("trig:stress_mgmt", 0.7, "High stress."))

    merged = {}
    for key, score, why in recs:
        if key not in merged or score > merged[key][0]:
            merged[key] = (score, [why])
        else:
            merged[key][1].append(why)
    return [(k, merged[k][0], "; ".join(merged[k][1])) for k in merged.keys()]

# -----------------------------
# Engine (kNN + fusion)
# -----------------------------
@dataclass
class KNNConfig:
    n_neighbors: int = 25
    rule_weight: float = 0.7
    knn_weight: float = 0.3

class RecommendationEngine:
    def __init__(self, config: KNNConfig = KNNConfig()):
        self.config = config
        self.ct: ColumnTransformer | None = None
        self.nn: NearestNeighbors | None = None
        self.train_df: pd.DataFrame | None = None
        self.n_neighbors: int | None = None

        self.feature_cols_num = ["age","bmi","itch_severity","flare_frequency","sleep_hours"]
        self.feature_cols_cat = [
            "sex","smoking","alcohol","climate","occupation",
            "scalp_involved","inverse_involved","nail_changes",
            "moisturiser_use","harsh_soap_use","diet_profile","severity"
        ]
        self.rec_cols = list(REC_LIBRARY.keys())

    def fit(self, df: pd.DataFrame):
        self.train_df = df.copy()

        # ensure all rec cols present
        for col in self.rec_cols:
            if col not in self.train_df.columns:
                self.train_df[col] = 0

        # ---- Pipelines with imputation (this removes NaN issues) ----
        num_pipe = Pipeline(steps=[
            ("impute", SimpleImputer(strategy="median")),
            ("scale", StandardScaler()),
        ])
        cat_pipe = Pipeline(steps=[
            ("impute", SimpleImputer(strategy="most_frequent")),
            ("onehot", OneHotEncoder(handle_unknown="ignore")),
        ])

        self.ct = ColumnTransformer(
            transformers=[
                ("num", num_pipe, self.feature_cols_num),
                ("cat", cat_pipe, self.feature_cols_cat),
            ],
            remainder="drop"
        )

        X = self.ct.fit_transform(self.train_df[self.feature_cols_num + self.feature_cols_cat])

        data_n = X.shape[0]
        self.n_neighbors = max(1, min(self.config.n_neighbors, data_n))
        self.nn = NearestNeighbors(n_neighbors=self.n_neighbors, metric="cosine")
        self.nn.fit(X)

    def _knn_scores(self, patient_features: Dict[str, Any]) -> Dict[str, float]:
        if self.nn is None or self.ct is None or self.train_df is None:
            return {}

        # One-row dataframe matching schema
        row = {c: None for c in self.feature_cols_num + self.feature_cols_cat}
        for k, v in patient_features.items():
            if k in row:
                row[k] = v

        x = self.ct.transform(pd.DataFrame([row]))

        n = self.n_neighbors or 1
        distances, indices = self.nn.kneighbors(x, n_neighbors=n)
        sims = 1 - distances[0]

        knn_sub = self.train_df.iloc[indices[0]]
        sim_sum = sims.sum() if sims.sum() > 0 else 1.0

        scores: Dict[str, float] = {}
        for rec in self.rec_cols:
            vals = knn_sub[rec].values.astype(float)
            score = float((vals * sims).sum() / sim_sum)
            if score > 0:
                scores[rec] = score
        return scores

    def recommend(self, patient_features: Dict[str, Any], severity: str):
        # rules
        rule_recs = rule_engine(patient_features, severity)
        rule_scores = {k: (s, why) for k, s, why in rule_recs}

        # knn
        knn_scores = self._knn_scores({**patient_features, "severity": severity})

        # fuse
        fused: Dict[str, Dict[str, Any]] = {}
        for key in set(rule_scores) | set(knn_scores):
            rs, why = rule_scores.get(key, (0.0, ""))
            ks = knn_scores.get(key, 0.0)
            final = self.config.rule_weight * rs + self.config.knn_weight * ks
            fused[key] = {"score": round(float(final), 3),
                          "why": why, "text": REC_LIBRARY.get(key, key)}

        ranked = sorted(fused.items(), key=lambda x: x[1]["score"], reverse=True)

        def bucket(k):
            if k.startswith("diet:"): return "diet"
            if k.startswith("skin:"): return "skin_care"
            if k.startswith("cloth:"): return "clothing"
            if k.startswith("scalp:"): return "hair_scalp_care"
            if k.startswith("trig:"): return "triggers_to_avoid"
            if k.startswith("habit:"): return "habits"
            if k.startswith("follow:"): return "follow_up"
            return "other"

        grouped: Dict[str, List[Dict[str, Any]]] = {}
        for key, info in ranked:
            grouped.setdefault(bucket(key), []).append({"id": key, **info})

        grouped["safety"] = [{
            "id": "safety:disclaimer",
            "text": "Lifestyle guidance only; not medical advice. Consult a dermatologist for diagnosis or if severe/worsening.",
            "score": 1.0, "why": "Safety"
        }]

        return {"recommendations": grouped, "meta": {"severity_input": severity}}
