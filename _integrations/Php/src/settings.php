<?php
return [
    'settings' => [
        'logger' => [
            'name'          => 'php-project_' . $_ENV["MODO"],
            'path'          => __DIR__ . '/../logs/app_' . $_ENV["MODO"] . '.log',
            'level'         => \Monolog\Logger::INFO,
            'token_loggly'  => 'b5f9b905-baaa-455b-8d19-af1fe14fa61b'
        ],
    ],
];
