from django.db import models

class Flight(models.Model):
    flight_number = models.CharField(max_length=10, unique=True)
    status = models.CharField(max_length=20)
    gate = models.CharField(max_length=5)
    departure_time = models.DateTimeField()

    def __str__(self):
        return self.flight_number
