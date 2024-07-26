import pika
import json
from django.conf import settings

def get_rabbitmq_connection():
    return pika.BlockingConnection(
        pika.ConnectionParameters(host=settings.RABBITMQ_HOST)
    )

def send_notification(message):
    connection = get_rabbitmq_connection()
    channel = connection.channel()

    channel.queue_declare(queue='notifications')

    channel.basic_publish(
        exchange='',
        routing_key='notifications',
        body=json.dumps(message),
        properties=pika.BasicProperties(
            delivery_mode=2  # Make message persistent
        )
    )

    connection.close()
