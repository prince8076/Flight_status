from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Flight
from .serializers import FlightSerializer
from datetime import timedelta

@api_view(['GET', 'POST'])
def flight_list(request):
    if request.method == 'GET':
        flights = Flight.objects.all()
        serializer = FlightSerializer(flights, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = FlightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def flight_detail(request, flight_number):
    try:
        flight = Flight.objects.get(flight_number=flight_number)
    except Flight.DoesNotExist:
        return Response({"error": "Flight not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FlightSerializer(flight)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data
        if 'delay' in data:
            flight.status = "Delayed"
            flight.departure_time += timedelta(minutes=int(data['delay']))
        if 'status' in data:
            flight.status = data['status']
        if 'gate' in data:
            flight.gate = data['gate']
        serializer = FlightSerializer(flight, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
