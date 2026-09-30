<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="theme-color" content="#faf4f5">

        <title>{{ $portfolio['profile']['name'] }} · Full Stack Developer</title>
        <meta name="description" content="{{ $portfolio['profile']['tagline'] }}">
        <meta property="og:type" content="website">
        <meta property="og:title" content="{{ $portfolio['profile']['name'] }} · Full Stack Developer">
        <meta property="og:description" content="{{ $portfolio['profile']['tagline'] }}">
        <meta property="og:url" content="{{ url('/') }}">
        <meta property="og:site_name" content="{{ $portfolio['profile']['name'] }}">
        <meta property="og:image" content="{{ asset('images/og.png') }}">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="{{ $portfolio['profile']['name'] }}, Full Stack Developer and QA Engineer">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $portfolio['profile']['name'] }} · Full Stack Developer">
        <meta name="twitter:description" content="{{ $portfolio['profile']['tagline'] }}">
        <meta name="twitter:image" content="{{ asset('images/og.png') }}">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">

        @fonts
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="bg-paper text-ink-700 antialiased">
        <div id="app"></div>
        <script>window.__PORTFOLIO__ = @json($portfolio);</script>
        <noscript>
            <main style="max-width:40rem;margin:4rem auto;font-family:sans-serif;color:#222">
                <h1>{{ $portfolio['profile']['name'] }}</h1>
                <p>{{ $portfolio['profile']['summary'] }}</p>
                <p><a href="mailto:{{ $portfolio['profile']['email'] }}">{{ $portfolio['profile']['email'] }}</a></p>
            </main>
        </noscript>
    </body>
</html>
