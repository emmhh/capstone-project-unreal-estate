from django.http import JsonResponse
def exampleFunction(request):
    print('it came to test function')
    return JsonResponse({"Example Object": "this is example"})