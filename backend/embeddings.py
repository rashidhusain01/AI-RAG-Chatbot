from sentence_transformers import SentenceTransformer
import numpy as np

model = None


def get_model():
    global model

    if model is None:
        model = SentenceTransformer("all-MiniLM-L6-v2")

    return model


def create_embeddings(chunks):
    embeddings = get_model().encode(
        chunks,
        batch_size=4,
        show_progress_bar=False,
        convert_to_numpy=True
    )

    return embeddings.astype("float32")

def create_query_embedding(question):
    embedding = get_model().encode(
        [question],
        batch_size=1,
        show_progress_bar=False,
        convert_to_numpy=True
    )

    return embedding.astype("float32")