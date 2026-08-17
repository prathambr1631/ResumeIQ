from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


class SemanticMatcher:
    MODEL_NAME = "all-MiniLM-L6-v2"

    def __init__(self):
        self.model = SentenceTransformer(
            self.MODEL_NAME
        )

    def calculate_similarity(
        self,
        resume_text: str,
        job_description: str,
    ) -> dict:
        resume_embedding = self.model.encode(
            resume_text,
            normalize_embeddings=True,
        )

        job_embedding = self.model.encode(
            job_description,
            normalize_embeddings=True,
        )

        similarity = cosine_similarity(
            [resume_embedding],
            [job_embedding],
        )[0][0]

        similarity_percentage = round(
            max(0, min(1, similarity)) * 100
        )

        return {
            "semantic_score": similarity_percentage,
            "model": self.MODEL_NAME,
        }
    