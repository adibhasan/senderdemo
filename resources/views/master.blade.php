<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ "Sender Dashboard" }}</title>
        <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
        <link rel="shortcut icon" type="image/png" href="{{ asset('/images/human.png') }}" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link href="{{ asset('/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('/css/style.css')}}" rel="stylesheet" type="text/css" />
        <script src="{{ asset ('/js/jquery-2.1.4.min.js') }}"></script>
    </head>
    <body>
        <div class="wrapper">
            <div class="content-wrapper">
            <section class="content container-fluid" id="main-content">
                @yield('content')
            </section>
            </div>
        </div>
        <script src="{{ asset ('/js/bootstrap.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/js/tmpl.min.js') }}"></script>
        <script src="{{ asset('/js/ajax.js') }}"></script>
        <script src="{{ asset('/js/request.js') }}"></script>
        <script src="{{ asset('/js/application.js') }}"></script>
    </body>
</html>