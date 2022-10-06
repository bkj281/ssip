import csv

from django.http import HttpResponse
from django.utils.datastructures import MultiValueDictKeyError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import FeedbackSerializers, RatingCountSerializer
from .models import responseModel
from verification.models import phoneModel


class form(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def post(request):
        serializer = FeedbackSerializers(data=request.data)
        if serializer.is_valid():
            verify = serializer.validated_data
            tuple_list = list(verify.items())
            mob = tuple_list[-1]

            try:
                verify = phoneModel.objects.filter(mobile=mob[1], is_verified=True).values_list()[0]
                serializer.save()
                mydata = phoneModel.objects.get(mobile=mob[1])
                mydata.is_verified = False
                mydata.save()
                return Response(data={"message": serializer.data}, status=status.HTTP_200_OK)
            except IndexError:
                return Response(
                    status=status.HTTP_404_NOT_FOUND,
                    data={
                        "message": "Phone number is not verified"
                    }
                )
        else:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    "message": serializer.errors
                }
            )


class FilterFeedback(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def post(request):
        response = request.data
        global serializer

        try:
            district = response["district"]
            subdivision = response["subdivision"]
            rating = response["rating"]
            station_id = response["station_id"]

            if station_id != "" and rating == "" and district == "" and subdivision == "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.station_id=" + "'" + station_id + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if station_id != "" and rating != "" and district == "" and subdivision == "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.station_id=" + "'" + station_id + "' AND f.res4=" + "'" + rating + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if station_id != "" and rating == "" and district != "" and subdivision == "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.station_id=" + "'" + station_id + "' AND f.district=" + "'" + \
                    district + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if station_id != "" and rating == "" and district == "" and subdivision != "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.station_id=" + "'" + station_id + "' AND f.subdivision=" + "'" + \
                    subdivision + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if station_id != "" and rating != "" and district == "" and subdivision != "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.station_id=" + "'" + station_id + "' AND f.res4=" + "'" + \
                    rating + "' AND f.subdivision=" + "'" + subdivision + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if station_id != "" and rating != "" and district != "" and subdivision == "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.station_id=" + "'" + station_id + "' AND f.res4=" + "'" + \
                    rating + "' AND f.district=" + "'" + district + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if station_id != "" and rating == "" and district != "" and subdivision == "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.station_id=" + "'" + station_id + "' AND f.district=" + "'" + \
                    district + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if station_id != "" and rating == "" and district != "" and subdivision != "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.station_id=" + "'" + station_id + "' AND f.district=" + "'" + \
                    district + "' AND f.subdivision=" + "'" + subdivision + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if district == "" and subdivision == "" and rating == "" and station_id == "":
                q = "SELECT * FROM feedback_responsemodel ORDER BY feedback_responsemodel.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if district != "" and subdivision == "" and rating == "" and station_id == "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.district=" + "'" + district + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if district == "" and subdivision != "" and rating == "" and station_id == "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.subdivision=" + "'" + subdivision + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if district == "" and subdivision == "" and rating != "" and station_id == "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE f.res4=" + "'" + rating + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if district != "" and subdivision != "" and rating == "" and station_id == "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.district=" + "'" + district + "' AND s.subdivision=" + "'" + \
                    subdivision + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if district != "" and subdivision == "" and rating != "" and station_id == "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.district=" + "'" + district + "' AND f.res4=" + "'" + rating + \
                    "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if district == "" and subdivision != "" and rating != "" and station_id == "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.subdivision=" + "'" + subdivision + "' AND f.res4=" + "'" + \
                    rating + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if district != "" and subdivision != "" and rating != "" and station_id == "":
                q = "SELECT f.* FROM feedback_responsemodel f INNER JOIN stations_stationmodel s ON " \
                    "f.station_id=s.station_id WHERE s.subdivision=" + "'" + subdivision + "' AND f.res4=" + "'" + \
                    rating + "' AND s.district=" + "'" + district + "' ORDER BY f.created_at DESC"
                queryset = responseModel.objects.raw(q)
                serializer = FeedbackSerializers(queryset, many=True)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

        except MultiValueDictKeyError as e:
            print()
            return Response(
                data={
                    'message': f'{e} is not provided'
                },
                status=status.HTTP_404_NOT_FOUND,
            )

    @staticmethod
    def get(request):
        try:
            response = HttpResponse(content_type='text/csv')
            writer = csv.writer(response)

            response['Content-Diposition'] = 'attachment; filename="feedback.csv"'
            print(response)
            writer.writerow(['ID', 'Station ID', 'HOW DID YOU COME TO THE POLICE STATION?', 'AFTER HOW MUCH TIME YOU WERE HEARD IN PS?', 'HOW WOULD YOU DESCRIBE YOUR EXPERIENCE WITH POLICE OFFICERS IN THE POLICE STATION?', 'RATINGS', 'created_at', 'updated_at', 'res'])

            for ele in serializer.data:
                writer.writerow(list(ele.values()))

            return response

        except:
            return Response(data={'message': 'Unable to access the data'}, status=status.HTTP_400_BAD_REQUEST)

class GetRatingCount(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = request.data

        try:
            district = response["district"]
            subdivision = response["subdivision"]
            station_id = response["station_id"]

            if station_id == "" and district == "" and subdivision == "":
                q = "SELECT id, res4, COUNT(*) AS count FROM feedback_responsemodel GROUP BY res4"
                queryset = responseModel.objects.raw(q)
                serializer = RatingCountSerializer(queryset, many=True)
                print(serializer.data)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if station_id != "" and district == "" and subdivision == "":
                q = "SELECT id, res4, COUNT(*) AS count FROM feedback_responsemodel WHERE feedback_responsemodel.station_id =" + "'" + station_id +"' GROUP BY res4"
                queryset = responseModel.objects.raw(q)
                serializer = RatingCountSerializer(queryset, many=True)
                print(serializer.data)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            
            if station_id == "" and district != "" and subdivision == "":
                q = "SELECT id, res4, COUNT(*) AS count FROM feedback_responsemodel WHERE feedback_responsemodel.district =" + "'" + district +"' GROUP BY res4"
                queryset = responseModel.objects.raw(q)
                serializer = RatingCountSerializer(queryset, many=True)
                print(serializer.data)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

            if station_id == "" and district == "" and subdivision != "":
                q = "SELECT id, res4, COUNT(*) AS count FROM feedback_responsemodel WHERE feedback_responsemodel.subdivision =" + "'" + subdivision +"' GROUP BY res4"
                queryset = responseModel.objects.raw(q)
                serializer = RatingCountSerializer(queryset, many=True)
                print(serializer.data)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )

        except KeyError as e:
            return Response(
                data={
                    'message': f'{e} is not provided'
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        
