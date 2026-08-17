import os

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class SemanticMatcher:
    MODEL_NAME = "all-MiniLM-L6-v2"
    LIGHTWEIGHT_MODEL_NAME = "TF-IDF"

    def __init__(self):
        self.environment = os.getenv(
            "ENVIRONMENT",
            "development",
        ).lower()

        self.model = None

        # Use the lightweight matcher in production
        # so the API can run on free-tier infrastructure.
        if self.environment != "production":
            from sentence_transformers import SentenceTransformer

            self.model = SentenceTransformer(
                self.MODEL_NAME
            )

    def calculate_similarity(
        self,
        resume_text: str,
        job_description: str,
    ) -> dict:

        if self.environment == "production":
            return self._calculate_tfidf_similarity(
                resume_text,
                job_description,
            )

        return self._calculate_embedding_similarity(
            resume_text,
            job_description,
        )

    def _calculate_embedding_similarity(
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

    @staticmethod
    def _calculate_tfidf_similarity(
        resume_text: str,
        job_description: str,
    ) -> dict:

        vectorizer = TfidfVectorizer(
            lowercase=True,
            stop_words="english",
            ngram_range=(1, 2),
        )

        vectors = vectorizer.fit_transform(
            [
                resume_text,
                job_description,
            ]
        )

        similarity = cosine_similarity(
            vectors[0:1],
            vectors[1:2],
        )[0][0]

        similarity_percentage = round(
            max(0, min(1, similarity)) * 100
        )

        return {
            "semantic_score": similarity_percentage,
            "model": SemanticMatcher.LIGHTWEIGHT_MODEL_NAME,
        }