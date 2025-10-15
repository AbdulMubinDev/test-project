from django.shortcuts import render
from .models import Test


def home(request):
    x = Test.objects.all().values()
    template = 'home/index.html'
    context = {
        'test': x,
    }
    return render(request, template, context)