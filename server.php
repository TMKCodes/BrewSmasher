<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once("account.php");
require_once("fermentable.php");
require_once("hop.php");
require_once("yeast.php");
require_once("misc.php");
require_once("recipe.php");

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
  } else if($data['request'] == "modify-fermentable") {
    $fermentable = new Fermentable($dblocation);
    $result = $fermentable->modify($data);
    unset($fermentable);
    SendResult($result);
  } else if($data['request'] == "delete-fermentable") {
    $fermentable = new Fermentable($dblocation);
    $result = $fermentable->delete($data['id']);
    unset($fermentable);
    SendResult($result);
  } else if($data['request'] == "modify-hop") {
    $hop = new Hop($dblocation);
    $result = $hop->modify($data);
    unset($hop);
    SendResult($result);
  } else if($data['request'] == "delete-hop") {
    $hop = new Hop($dblocation);
    $result = $hop->delete($data['id']);
    unset($hop);
    SendResult($result);
  } else if($data['request'] == "delete-misc") {
    $misc = new Misc($dblocation);
    $result = $misc->delete($data['id']);
    unset($misc);
    SendResult($result);
  } else if($data['request'] == "delete-yeast") {
    $yeast = new Yeast($dblocation);
    $result = $yeast->delete($data['id']);
    unset($yeast);
    SendResult($result);
  } else if($data['request'] == "modify-yeast") {
    $yeast = new Yeast($dblocation);
    $result = $yeast->modify($data);
    unset($yeast);
    SendResult($result);
  } else if($data['request'] == "save-recipe") {
    $recipe = new Recipe($dblocation);
    $result = $recipe->add($data['packet']);
    unset($recipe);
    SendResult($result);
  } else if($data['request'] == "search-your-recipes") {
    $recipe = new Recipe($dblocation);
    $result = $recipe->getPrivateList($data['search-your-recipes-type-checkbox'], $data['uid'], $data['search-your-recipes-input']);
    unset($recipe);
    SendResult($result);
  } else if($data['request'] == "delete-recipe") {
    $recipe = new Recipe($dblocation);
    $result = $recipe->remove($data['id']);
    unset($recipe);
    SendResult($result);
  } else if($data['request'] == "get-every-ingredient") {
    $fermentable = new Fermentable($dblocation);
    $Malt = $fermentable->getListByKeyword("Malt", "");
    $Sugar = $fermentable->getListByKeyword("Sugar", "");
    $Fruit = $fermentable->getListByKeyword("Fruit", "");
    $Extract = $fermentable->getListByKeyword("Extract", "");
    $Other1 = $fermentable->getListByKeyword("Other", "");
    unset($fermentable);
    $hop = new Hop($dblocation);
    $Bittering = $hop->getListByKeyword("Bittering", "");
    $Aroma = $hop->getListByKeyword("Aroma", "");
    $Both = $hop->getListByKeyword("Both", "");
    unset($hop);
    $yeast = new Yeast($dblocation);
    $Ale = $yeast->getListByKeyword("Ale", "");
    $Lager = $yeast->getListByKeyword("Lager", "");
    $Wheat = $yeast->getListByKeyword("Wheat", "");
    $Wine = $yeast->getListByKeyword("Wine", "");
    $Champagne = $yeast->getListByKeyword("Champagne", "");
    $Other2 = $yeast->getListByKeyword("Other", "");
    unset($yeast);
    $misc = new Misc($dblocation);
    $Spice = $misc->getListByKeyword("Spice", "");
    $Fining = $misc->getListByKeyword("Fining", "");
    $WaterAgent = $misc->getListByKeyword("Water Agent", "");
    $Herb = $misc->getListByKeyword("Herb", "");
    $Flavor = $misc->getListByKeyword("Flavor", "");
    $Other3 = $misc->getListByKeyword("Other", "");
    unset($misc);
    SendResult(array("success" => "true",
      "fermentables" => array("malt" => $Malt['fermentables'],
                              "sugar" => $Sugar['fermentables'],
                              "fruit" => $Fruit['fermentables'],
                              "extract" => $Extract['fermentables'],
                              "other" => $Other1['fermentables']),
      "hops" => array("bittering" => $Bittering['hops'],
                      "aroma" => $Aroma['hops'],
                      "both" => $Both['hops']),
      "yeasts" => array("ale" => $Ale['yeasts'],
                        "lager" => $Lager['yeasts'],
                        "wheat" => $Wheat['yeasts'],
                        "wine" => $Wine['yeasts'],
                        "champagne" => $Champagne['yeasts'],
                        "other" => $Other2['yeasts']),
      "miscs" => array("spice" => $Spice['miscs'],
                        "fining" => $Fining['miscs'],
                        "water_agent" => $WaterAgent['miscs'],
                        "herb" => $Herb['miscs'],
                        "flavor" => $Flavor['miscs'],
                        "other" => $Other3['miscs'])));
  }
}
?>
