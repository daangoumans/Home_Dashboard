<?php

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'sonos_find':
            sonos_find();
            break;
        case 'sonos_get_favorites':
            if (isset($_POST['speaker'])){
            sonos_get_favorites($_POST['speaker']);
            }
            break;
        case 'sonos_volume':
            if (isset($_POST['speaker'], $_POST['direction'], $_POST['amount'])) {
              sonos_volume($_POST['speaker'], $_POST['direction'], $_POST['amount']);
            }
            break;
        case 'sonos_playback':
            if (isset($_POST['speaker'], $_POST['command'])) {
              sonos_playback($_POST['speaker'], $_POST['command']);
            }
            break;
        case 'sonos_play':
            if (isset($_POST['speaker'], $_POST['music'])) {
              sonos_play($_POST['speaker'], $_POST['music']);
            }
            break;
        case 'python':
            python();
            break;
        case 'other':
            other();
            break;
    }
}

/********************************************
FUNCTIONS
********************************************/
function sonos_find() {
    $command = escapeshellcmd('./controllers/find.py');
    $output = shell_exec($command);
    echo $output;
    exit;
}

function sonos_get_favorites($speaker) {
    $command = escapeshellcmd('./controllers/music.py '.$speaker.' list');
    $output = shell_exec($command);
    echo $output;
    exit;
}

function sonos_play($speaker, $music) {
    $command = escapeshellcmd('./controllers/music.py '.$speaker.' play_favorite "'.$music.'"');
    $output = shell_exec($command);
    echo $output;
    exit;
}

function sonos_playback($speaker, $command) {
    $command_string = './controllers/playback.py '.$speaker." ".$command;
    $command = escapeshellcmd($command_string);
    $output = shell_exec($command);
    echo $output;
    exit;
}

function sonos_volume($speaker, $command, $amount) {
    $command_string = './controllers/volume.py '.$speaker." ".$command." ".$amount;
    $command = escapeshellcmd($command_string);
    $output = shell_exec($command);
    echo 'New volume: '.$output.' from: '.$command_string;
    exit;
}


function python() {
    $command = escapeshellcmd('./controllers/test.py');
    $output = shell_exec($command);
    echo $output;
    exit;
}


function other() {
    echo "The 'Other button' is called.";
    exit;
}


?>
