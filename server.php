<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once("account.php");
require_once("fermentable.php");
require_once("hop.php");
require_once("yeast.php");
require_once("misc.php");

header('Content-type: application/json');

$dblocation = "db.sqlite";

if(!empty($_GET)) {
  HandleData($_GET, $dblocation);
} else if(!empty($_POST)) {
  HandleData($_POST, $dblocation);
}

function SendResult($data) {
  printf("%s", json_encode($data));
  exit;
}

function HandleData($data, $dblocation) {
  if($data['request'] == "register") {
    $account = new Account($dblocation);
    $result = $account->register($data['email'], $data['passwordA'], $data['passwordB']);
    unset($account);
    SendResult($result);
  } else if($data['request'] == "open-session") {
    $account = new Account($dblocation);
    $result = $account->open_session($data['email'], $data['password']);
    unset($account);
    SendResult($result);
  } else if($data['request'] == "close-session") {
    $account = new Account($dblocation);
    $result = $account->close_session($data['session']);
    unset($account);
    SendResult($result);
  } else if($data['request'] == "add-fermentable") {
    $fermentable = new Fermentable($dblocation);
    $result = $fermentable->add($data);
    unset($fermentable);
    SendResult($result);
  } else if($data['request'] == "search-fermentables") {
    $fermentable = new Fermentable($dblocation);
    $result = $fermentable->getListByKeyword($data['search-fermentables-type-checkbox'], $data['search-fermentables-search-input']);
    unset($fermentable);
    SendResult($result);
  } else if($data['request'] == "add-hop") {
    $hop = new Hop($dblocation);
    $result = $hop->add($data);
    unset($hop);
    SendResult($result);
  } else if($data['request'] == "search-hops") {
    $hop = new Hop($dblocation);
    $result = $hop->getListByKeyword($data['search-hops-type-checkbox'], $data['search-hops-search-input']);
    unset($hop);
    SendResult($result);
  } else if($data['request'] == "add-yeast") {
    $yeast = new Yeast($dblocation);
    $result = $yeast->add($data);
    unset($yeast);
    SendResult($result);
  } else if($data['request'] == "search-yeasts") {
    $yeast = new Yeast($dblocation);
    $result = $yeast->getListByKeyword($data['search-yeasts-type-checkbox'], $data['search-yeasts-search-input']);
    unset($yeast);
    SendResult($result);
  } else if($data['request'] == "add-misc") {
    $misc = new Misc($dblocation);
    $result = $misc->add($data);
    unset($misc);
    SendResult($result);
  } else if($data['request'] == "search-miscs") {
    $misc = new Misc($dblocation);
    $result = $misc->getListByKeyword($data['search-miscs-type-checkbox'], $data['search-miscs-search-input']);
    unset($misc);
    SendResult($result);
  }
}
?>