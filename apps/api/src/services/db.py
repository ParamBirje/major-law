from typing import List
import boto3
from botocore.exceptions import ClientError
from src.models.message import Message
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
messages_table = dynamodb.Table('majorlaw.messages')

class MessageService:
    def get_message(self, message_id: str):
        try:
            response = messages_table.get_item(Key={'message_id': message_id})
        except ClientError as e:
            print(e.response['No item found'])
        else:
            return response['Item']

    def put_message(self, message: Message):
        try:
            response = messages_table.put_item(Item=message.data)
        except ClientError as e:
            print(e.response['Couldnt put item'])
        else:
            return response

    def delete_message(self, message_id: str):
        try:
            response = messages_table.delete_item(Key={'message_id': message_id})
        except ClientError as e:
            print(e.response['Delete item failed'])
        else:
            return response

    def get_messages(self, session_id: str) -> List[Message]:
        response = messages_table.query(
            KeyConditionExpression=Key('session_id').eq(session_id)
        )
        return response['Items']