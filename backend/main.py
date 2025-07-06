from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DealInput(BaseModel):
    price: float
    rent: float
    expenses: float

@app.post("/analyze")
def analyze(data: DealInput):
    annual_rent = data.rent * 12
    annual_expenses = data.expenses * 12
    cash_flow = (data.rent - data.expenses) * 12
    cap_rate = round((annual_rent - annual_expenses) / data.price * 100, 2)
    roi = round((cash_flow / data.price) * 100, 2)

    return {
        "cashFlow": cash_flow,
        "capRate": cap_rate,
        "roi": roi,
        "totalExpenses": annual_expenses
    }
