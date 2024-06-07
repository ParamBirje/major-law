import boto3
import json
from langchain_aws import BedrockLLM
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate

from typing import List, Dict

client = boto3.client("bedrock-runtime", region_name="us-east-1")
model_id = "cohere.command-r-v1:0"
llm = BedrockLLM(
    credentials_profile_name="default",
    region_name="us-east-1",
    model_id="amazon.titan-text-express-v1",
    model_kwargs={
        "temperature": 0.5,
        # "max_gen_len": 124
    })


def one_time_lang(text: str) -> str:
    # prompt_template = PromptTemplate(
    #     input_variables=["text"],
    #     template="Answer this: {text}"
    # )
    chain = ConversationChain(llm=llm, memory=ConversationBufferMemory())

    res = chain.invoke(input=text)

    return res


# print(one_time_lang("Describe if the earth round in one sentence"))


def one_time_response(prompt: str, chat_history: List[Dict]) -> str:
    '''
    Provides a one time response for the given `prompt`
    '''

    native_request = {
        "message": prompt,
        "chat_history": chat_history,
        "max_tokens": 1024,
        "temperature": 0.9,
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


# print(one_time_response("Describe life in one line.", [
#     {
#         "role": "USER",
#         "message": "Act as if you are a funny IT engineer. Answer any question I ask with a funny pun from I.T"
#     },
#     {
#         "role": "CHATBOT",
#         "message": "Okay, I will."
#     },
# ]))
