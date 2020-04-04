<?php

class Recipe {
  public $db = null;
  public function __construct($location) {
    $this->db = new SQLite3($location);
    $this->db->query("CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY, sender INTEGER, type TEXT, name TEXT, batch_size TEXT, boil_size TEXT, boil_time TEXT, efficiency TEXT, " .
                    "fermentables_amount TEXT, note TEXT, share TEXT, FOREIGN KEY(sender) REFERENCES account(id));");
    $this->db->query("CREATE TABLE IF NOT EXISTS recipe_fermentables (id INTEGER PRIMARY KEY, fip INTEGER, rip integer, amount TEXT, " .
                    "FOREIGN KEY(fip) REFERENCES fermentables(id), FOREIGN KEY(rip) REFERENCES recipes(id));");
    $this->db->query("CREATE TABLE IF NOT EXISTS recipe_hops (id INTEGER PRIMARY KEY, hip INTEGER, rip integer, amount TEXT, ctime TEXT, usage TEXT, type TEXT, " .
                    "FOREIGN KEY(hip) REFERENCES hops(id), FOREIGN KEY(rip) REFERENCES recipes(id));");
    $this->db->query("CREATE TABLE IF NOT EXISTS recipe_miscs (id INTEGER PRIMARY KEY, mip INTEGER, rip integer, amount TEXT, ctime TEXT, usage TEXT, unit TEXT, " .
                    "FOREIGN KEY(mip) REFERENCES miscs(id), FOREIGN KEY(rip) REFERENCES recipes(id));");
    $this->db->query("CREATE TABLE IF NOT EXISTS recipe_yeasts (id INTEGER PRIMARY KEY, yip INTEGER, rip integer, amount TEXT, amount_type TEXT, starter_required TEXT, " .
                    "FOREIGN KEY(yip) REFERENCES yeasts(id), FOREIGN KEY(rip) REFERENCES recipes(id));");
  }
  public function add($data) {
    $data = json_decode(urldecode($data), true);
    $slimit = 90;
    $canBeAdded = true;
    $stmt = $this->db->prepare("SELECT * FROM recipes WHERE type = :type;");
    $stmt->bindValue(":type", $data['type']);
    $res = $stmt->execute();
    if($res != null) {
      while($row = $res->fetchArray()) {
        $similarity = 0;
        similar_text($row['name'], $data['name'], $similarity);
        if($similarity > $slimit) {
          $canBeAdded = false;
          break;
        }
      }
    }
    if($canBeAdded == false) {
      return array("success" => "false", "reason" => "Too similar name to another existing recipe wich has same used");
    }
    // Since it can be added then do the long insert into query.
    $stmt = $this->db->prepare("INSERT INTO recipes (sender, type, name, batch_size, boil_size, boil_time, efficiency, fermentables_amount, note, share" .
                              ") VALUES (:sender, :type, :name, :batch_size, :boil_size, :boil_time, :efficiency, :fermentables_amount, :note, :share); ");
    $stmt->bindValue(":sender", $data['uid']);
    $stmt->bindValue(":type", $data['type']);
    $stmt->bindValue(":name", $data['name']);
    $stmt->bindValue(":batch_size", $data['batch_size']);
    $stmt->bindValue(":boil_size", $data['boil_size']);
    $stmt->bindValue(":boil_time", $data['boil_time']);
    $stmt->bindValue(":efficiency", $data['efficiency']);
    $stmt->bindValue(":fermentables_amount", $data['fermentable_amount']);
    $stmt->bindValue(":note", $data['note']);
    $stmt->bindValue(":share", $data['share']);
    $res = $stmt->execute();
    if($res == false) {
      return array("success" => "false", "reason" => "For some reason insertion to database failed.");
    }
    $rip = null;
    $stmt = $this->db->prepare("SELECT * FROM recipes WHERE name = :name;");
    $stmt->bindValue(":name", $data['name']);
    $res = $stmt->execute();
    if($res != null) {
      while($row = $res->fetchArray()) {
        if($row['name'] == $data['name']) {
          $rip = $row['id'];
        }
      }
    }
    if($rip == null) {
      return array("success" => "false", "reason" => "For some reason could not retrieve the id of last inserted recipe.");
    }
    $failed = false;
    for($x = 0; $x < count($data['fermentables']); $x++) {
      $stmt = $this->db->prepare("INSERT INTO recipe_fermentables (fip, rip, amount) VALUES (:fip, :rip, :amount);");
      $stmt->bindValue(":fip", $data['fermentables'][$x]['id']);
      $stmt->bindValue(":rip", $rip);
      $stmt->bindValue(":amount", $data['fermentables'][$x]['amount']);
      $res = $stmt->execute();
      if($res == false) {
        $failed = true;
        break;
      }
    }
    if($failed == true) {
      return array("success" => "false", "reason" => "For some reason could not retrieve the id of last inserted recipe.");
    }
    for($x = 0; $x < count($data['hops']); $x++) {
      $stmt = $this->db->prepare("INSERT INTO recipe_hops (hip, rip, amount, ctime, usage, type) VALUES (:hip, :rip, :amount, :ctime, :usage, :type);");
      $stmt->bindValue(":hip", $data['hops'][$x]['id']);
      $stmt->bindValue(":rip", $rip);
      $stmt->bindValue(":amount", $data['hops'][$x]['amount']);
      $stmt->bindValue(":ctime", $data['hops'][$x]['time']);
      $stmt->bindValue(":usage", $data['hops'][$x]['usage']);
      $stmt->bindValue(":type", $data['hops'][$x]['type']);
      $res = $stmt->execute();
      if($res == false) {
        $failed = true;
        break;
      }
    }
    if($failed == true) {
      return array("success" => "false", "reason" => "For some reason could not retrieve the id of last inserted recipe.");
    }
    for($x = 0; $x < count($data['miscs']); $x++) {
      $stmt = $this->db->prepare("INSERT INTO recipe_miscs (mip, rip, amount, ctime, usage, unit) VALUES (:mip, :rip, :amount, :ctime, :usage, :unit);");
      $stmt->bindValue(":mip", $data['miscs'][$x]['id']);
      $stmt->bindValue(":rip", $rip);
      $stmt->bindValue(":amount", $data['miscs'][$x]['amount']);
      $stmt->bindValue(":ctime", $data['miscs'][$x]['time']);
      $stmt->bindValue(":usage", $data['miscs'][$x]['usage']);
      $stmt->bindValue(":unit", $data['miscs'][$x]['unit']);
      $res = $stmt->execute();
      if($res == false) {
        $failed = true;
        break;
      }
    }
    if($failed == true) {
      return array("success" => "false", "reason" => "For some reason could not retrieve the id of last inserted recipe.");
    }
    for($x = 0; $x < count($data['yeasts']); $x++) {
      $stmt = $this->db->prepare("INSERT INTO recipe_yeasts (yip, rip, amount, amount_type, starter_required) VALUES (:yip, :rip, :amount, :amount_type, :starter_required);");
      $stmt->bindValue(":yip", $data['yeasts'][$x]['id']);
      $stmt->bindValue(":rip", $rip);
      $stmt->bindValue(":amount", $data['yeasts'][$x]['amount']);
      $stmt->bindValue(":amount_type", $data['yeasts'][$x]['amount-type']);
      $stmt->bindValue(":starter_required", $data['yeasts'][$x]['starter-required']);
      $res = $stmt->execute();
      if($res == false) {
        $failed = true;
        break;
      }
    }
    if($failed == true) {
      return array("success" => "false", "reason" => "For some reason could not retrieve the id of last inserted recipe.");
    }
    if($failed == false) {
      return array("success" => "true");
    }
  }

  public function remove($id) {
    $stmt = $this->db->prepare("DELETE FROM recipes WHERE id = :id;");
    $stmt->bindValue(":id", $id);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $stmt = $this->db->prepare("DELETE FROM recipe_fermentables WHERE rip = :id;");
    $stmt->bindValue(":id", $id);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $stmt = $this->db->prepare("DELETE FROM recipe_hops WHERE rip = :id;");
    $stmt->bindValue(":id", $id);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $stmt = $this->db->prepare("DELETE FROM recipe_miscs WHERE rip = :id;");
    $stmt->bindValue(":id", $id);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $stmt = $this->db->prepare("DELETE FROM recipe_yeasts WHERE rip = :id;");
    $stmt->bindValue(":id", $id);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    return array("success" => "true");
  }

  public function getListByType($type) {
    $stmt = $this->db->prepare("SELECT * FROM recipes WHERE type = :type;");
    $stmt->bindValue(":type", $type);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $rows = array();
    while($row = $res->fetchArray()) {
      array_push($rows, $row);
    }
    return array("success" => "true", "recipes" => $rows);
  }

  public function getPrivateList($type, $sender, $keyword) {
    if($sender == "" && $keyword == "") {
      return $this->getListByType($type);
    }
    $stmt = $this->db->prepare("SELECT * FROM recipes WHERE type = :type AND sender = :sender AND name LIKE :name;");
    $stmt->bindValue(":type", $type);
    $stmt->bindValue(":sender", $sender);
    $stmt->bindValue(":name", "%" . $keyword . "%");
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $rows = array();
    while($row = $res->fetchArray()) {
      // query rest of the data.
      $subStmt = $this->db->prepare("SELECT * FROM recipe_fermentables WHERE rip = :rip;");
      $subStmt->bindValue(":rip", $row['id']);
      $subRes = $subStmt->execute();
      $fermentables = array();
      while($fermentable = $subRes->fetchArray()) {
        array_push($fermentables, $fermentable);
      }
      $row['fermentables'] = $fermentables;
      $subStmt = $this->db->prepare("SELECT * FROM recipe_hops WHERE rip = :rip;");
      $subStmt->bindValue(":rip", $row['id']);
      $subRes = $subStmt->execute();
      $hops = array();
      while($hop = $subRes->fetchArray()) {
        array_push($hops, $hop);
      }
      $row['hops'] = $hops;
      $subStmt = $this->db->prepare("SELECT * FROM recipe_miscs WHERE rip = :rip;");
      $subStmt->bindValue(":rip", $row['id']);
      $subRes = $subStmt->execute();
      $miscs = array();
      while($misc = $subRes->fetchArray()) {
        array_push($miscs, $misc);
      }
      $row['miscs'] = $miscs;
      $subStmt = $this->db->prepare("SELECT * FROM recipe_yeasts WHERE rip = :rip;");
      $subStmt->bindValue(":rip", $row['id']);
      $subRes = $subStmt->execute();
      $yeasts = array();
      while($yeast = $subRes->fetchArray()) {
        array_push($yeasts, $yeast);
      }
      $row['yeasts'] = $yeasts;
      array_push($rows, $row);
    }
    return array("success" => "true", "recipes" => $rows);
  }
}

?>
