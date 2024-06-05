import boto3
import json

client = boto3.client("bedrock-runtime", region_name="us-east-1")
# Set the model ID, e.g., Command R.
model_id = "cohere.command-r-v1:0"


def one_time_response(prompt: str) -> str:
    prompt = "Describe what is life in one line."
    native_request = {
        "message": prompt,
        "max_tokens": 1024,
        "temperature": 0.5,
    }

    request = json.dumps(native_request)

    try:
        response = client.invoke_model(modelId=model_id, body=request)

    except (Exception) as e:
        print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
        exit(1)

    model_response = json.loads(response["body"].read())

    response_text = model_response["text"]
    return response_text
