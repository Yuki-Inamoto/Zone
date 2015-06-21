from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
from .models import Place, Picture
from django.shortcuts import redirect
from django.contrib import messages
from django.http import HttpResponse
from django.contrib.auth import logout as auth_logout
import requests


# Create your views here.
def index(request):
    return render_to_response('index.html', {}, context_instance=RequestContext(request))

def map(request):
    places = Place.objects.all()
    return render_to_response('map.html', {'places': places}, context_instance=RequestContext(request))

def list(request):
    places = []
    for place in Place.objects.all():
        pictures = Picture.objects.filter(place_id=place.id)

        #send only data of top picture of places
        if len(pictures):
            places.append({'image': pictures[0].data, 'name': place.name, 'wifi_softbank': place.wifi_softbank,
                           'wifi_free': place.wifi_free, 'id': place.id})
        else:
            places.append({'name': place.name, 'wifi_softbank': place.wifi_softbank, 'wifi_free': place.wifi_free,
                           'id': place.id})

    return render_to_response('list.html', {'places': places}, context_instance=RequestContext(request))

def weather_api(request):
    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + request.GET['lat'] + "&lon=" + request.GET['lng']
    re = requests.get(url)
    return HttpResponse(str(re.json()))

def places_api(request):
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.691638,139.704616&radius=50000&keyword=cafe|foo&sensor=false&language=ja&key=AIzaSyAqx3ox6iSZ3599nPe314NQNkbxfg-aXC0";
    re = requests.get(url)
    result = str(re.json())
    return HttpResponse(result)

def detail(request, place_id):
    place = Place.objects.filter(id = place_id)
    pictures = Picture.objects.filter(place_id = place_id)

    if len(pictures):
        return render_to_response('detail.html', {"place": place[0], "pictures": pictures[0].data}, context_instance=RequestContext(request))
    else:
        return render_to_response('detail.html', {"place": place[0]}, context_instance=RequestContext(request))

def logout(request):
    auth_logout(request)
    messages.success(request, 'ログアウトしました。')
    return redirect('/')

