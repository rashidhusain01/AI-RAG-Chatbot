from sentence_transformers import SentenceTransformer
import numpy as np

model = None


def get_model():
    global model

    if model is None:
        model = SentenceTransformer("all-MiniLM-L6-v2")

    return model


def create_embeddings(chunks):
    embeddings = get_model().encode(chunks)
    return np.array(embeddings).astype("float32")


def create_query_embedding(question):
    embedding = get_model().encode([question])
    return np.array(embedding).astype("float32")