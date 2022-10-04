from asyncio.windows_events import NULL
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .models import stationModel
from .StationSerialzer import StationSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class AddStation(APIView):
   permission_classes = [IsAuthenticated]

   def post(self, request):
    response = request.data
    stationId = response['station_id']
    
    try: 
        stationModel.objects.get(station_id = stationId)
    
        return Response(
            status=status.HTTP_404_NOT_FOUND,
            data={
                "success": "false",
                "message": "Station alredy exists"
                }
        )
                
    except:

        x = stationModel.objects.create(
            email = response["email"],
            station_id = response["station_id"],
            station_name = response["station_name"],
            district = response["district"],
            subdivision = response["subdivision"],
            address = response["address"],
            contact = response["contact"],
            pincode = response["pincode"],
        )
        if (x == NULL):
            return Response(
                status=status.HTTP_406_NOT_ACCEPTABLE,
                data={
                    "success": "false",
                    "message": "Oops! station didn't create successfully"
                    }
                )
        return Response(
                status=status.HTTP_200_OK,
                data={
                    "success": "true",
                    "message": "Station created successfully"
                }
        )
        