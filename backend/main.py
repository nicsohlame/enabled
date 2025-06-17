from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
import sign_language_translator as slt
import uuid
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TextInput(BaseModel):
    text: str

@app.post("/translate-sign")
async def translate_sign(input: TextInput, request: Request):
    try:
        raw_body = await request.body()
        print("📥 Raw body:", raw_body)
        print("✅ Received text:", input.text)

        # Clean input (remove line breaks)
        clean_text = input.text.replace('\n', ' ').replace('\r', ' ').replace("\r\n", ' ').strip()
        print("🧼 Cleaned text:", clean_text)

        # Generate unique filename
        output_file = f"output_{uuid.uuid4().hex}.mp4"

        # Translate using sign_language_translator
        model = slt.models.ConcatenativeSynthesis(
            text_language="english",
            sign_language="american_sign_language",
            sign_format="video"
        )

        print("🛠 Starting translation...")
        try:
            model.translate_text_to_sign(clean_text, save_to=output_file)
        except Exception as model_err:
            print("🔥 Model error:", model_err)
            raise
        print("✅ Translation complete.")

        # Check output file exists
        if not os.path.exists(output_file):
            raise Exception("Generated file not found. Translation may have failed.")

        return FileResponse(output_file, media_type="video/mp4")

    except Exception as e:
        print("🔥 ERROR in /translate-sign:", e)
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )