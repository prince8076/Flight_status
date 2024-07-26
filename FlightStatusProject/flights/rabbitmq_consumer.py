import pika
import json
from django.conf import settings

def get_rabbitmq_connection():
    return pika.BlockingConnection(
        pika.ConnectionParameters(host=settings.RABBITMQ_HOST)
    )

def callback(ch, method, properties, body):
    message = json.loads(body)
    print(f"Received message: {message}")
    # Implement your notification logic here (e.g., send SMS, email)

def start_consuming():
    connection = get_rabbitmq_connection()
    channel = connection.channel()

    channel.queue_declare(queue='notifications')

    channel.basic_consume(
        queue='notifications',
        on_message_callback=callback,
        auto_ack=True
    )

    print('Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()
