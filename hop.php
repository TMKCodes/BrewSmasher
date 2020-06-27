<?php

class Hop {
  public $db = null;
  public function __construct($location) {
    $this->db = new SQLite3($location);
    $this->db->query("CREATE TABLE IF NOT EXISTS hops (id INTEGER PRIMARY KEY, sender TEXT, name TEXT, origin TEXT, alpha TEXT, used TEXT, " .
                    "type TEXT, form TEXT, beta TEXT, hsi TEXT, substitutes TEXT, humulene TEXT, caryophyllene TEXT, " .
                    "cohumulone TEXT, myrcene TEXT, note TEXT, FOREIGN KEY(sender) REFERENCES account(id));");
  }
  public function add($data) {
    $slimit = 90;
    $canBeAdded = true;
    $stmt = $this->db->prepare("SELECT * FROM hops WHERE origin = :origin;");
    $stmt->bindValue(":origin", $data['hop-origin']);
    $res = $stmt->execute();
    if($res != null) {
      while($row = $res->fetchArray()) {
        $similarity = 0;
        similar_text($row['name'], $data['hop-name'], $similarity);
        if($similarity > $slimit) {
          $canBeAdded = false;
          break;
        }
      }
    }
    if($canBeAdded == false) {
      return array("success" => "false", "reason" => "Too similar name to another existing hop wich has same origin");
    }
    // Since it can be added then do the long insert into query.
    $stmt = $this->db->prepare("INSERT INTO hops (sender, name, origin, alpha, used, " .
                              "type, form, beta, hsi, substitutes, humulene, caryophyllene, " .
                              "cohumulone, myrcene, note" .
                              ") VALUES (:sender, :name, :origin, :alpha, :used, " .
                              ":type, :form, :beta, :hsi, :substitutes, :humulene, :caryophyllene, " .
                              ":cohumulone, :myrcene, :note); ");
    $stmt->bindValue(":sender", $data['uid']);
    $stmt->bindValue(":name", $data['hop-name']);
    $stmt->bindValue(":origin", $data['hop-origin']);
    $stmt->bindValue(":alpha", $data['hop-alpha']);
    $stmt->bindValue(":used", $data['hop-use']);
    $stmt->bindValue(":type", $data['hop-type']);
    $stmt->bindValue(":form", $data['hop-form']);
    $stmt->bindValue(":beta", $data['hop-beta']);
    $stmt->bindValue(":hsi", $data['hop-hsi']);
    $stmt->bindValue(":substitutes", $data['hop-substitutes']);
    $stmt->bindValue(":humulene", $data['hop-humulene']);
    $stmt->bindValue(":caryophyllene", $data['hop-caryophyllene']);
    $stmt->bindValue(":cohumulone", $data['hop-cohumulone']);
    $stmt->bindValue(":myrcene", $data['hop-myrcene']);
    $stmt->bindValue(":note", $data['hop-note']);
    $res = $stmt->execute();
    if($res != false) {
      return array("success" => "true");
    } else {
      return array("success" => "false", "reason" => "For some reason insertion to database failed.");
    }
  }

  public function modify($data) {
    $stmt = $this->db->prepare("SELECT * FROM hops WHERE id = :id;");
    $stmt->bindValue(":id", $data["hop-id"]);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $rows = array();
    while($row = $res->fetchArray()) {
      array_push($rows, $row);
    }
    // TODO: Use $rows to save the backup of fermentable.
    $stmt = $this->db->prepare("UPDATE hops " .
                                "SET sender = :sender, " .
                                "name = :name, " .
                                "origin = :origin, " .
                                "alpha = :alpha, " .
                                "used = :used, " .
                                "type = :type, " .
                                "form = :form, " .
                                "beta = :beta, " .
                                "hsi = :hsi, " .
                                "substitutes = :substitutes, " .
                                "humulene = :humulene, " .
                                "caryophyllene = :caryophyllene, " .
                                "cohumulone = :cohumulone, " .
                                "myrcene = :myrcene, " .
                                "note = :note " .
                                "WHERE id = :id;");
    $stmt->bindValue(":sender", $data['uid']);
    $stmt->bindValue(":name", $data['hop-name']);
    $stmt->bindValue(":origin", $data['hop-origin']);
    $stmt->bindValue(":alpha", $data['hop-alpha']);
    $stmt->bindValue(":used", $data['hop-use']);
    $stmt->bindValue(":type", $data['hop-type']);
    $stmt->bindValue(":form", $data['hop-form']);
    $stmt->bindValue(":beta", $data['hop-beta']);
    $stmt->bindValue(":hsi", $data['hop-hsi']);
    $stmt->bindValue(":substitutes", $data['hop-substitutes']);
    $stmt->bindValue(":humulene", $data['hop-humulene']);
    $stmt->bindValue(":caryophyllene", $data['hop-caryophyllene']);
    $stmt->bindValue(":cohumulone", $data['hop-cohumulone']);
    $stmt->bindValue(":myrcene", $data['hop-myrcene']);
    $stmt->bindValue(":note", $data['hop-note']);
    $stmt->bindValue(":id", $data["hop-id"]);
    $res = $stmt->execute();
    if($res != false) {
      return array("success" => "true");
    } else {
      return array("success" => "false", "reason" => "For some reason update failed.");
    }
  }

  public function delete($id) {
    $stmt = $this->db->prepare("DELETE FROM hops WHERE id = :id");
    $stmt->bindValue(":id", $id);
    $res = $stmt->execute();
    if($res == null ) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    return array("success" => "true");
  }

  public function getListByType($type) {
    $stmt = $this->db->prepare("SELECT * FROM hops WHERE type = :type;");
    $stmt->bindValue(":type", $type);
    $res = $stmt->execute();
    if($res == null) {
      return array("s = :success" => "false", "reason" => "Database query failed.");
    }
    $rows = array();
    while($row = $res->fetchArray()) {
      array_push($rows, $row);
    }
    return array("success" => "true", "hops" => $rows);
  }

  public function getListByKeyword($type, $keyword) {
    if($keyword == "") {
      return $this->getListByType($type);
    }
    $stmt = $this->db->prepare("SELECT * FROM hops WHERE type = :type AND (name LIKE :keywordA OR origin LIKE :keywordB);");
    $stmt->bindValue(":type", $type);
    $stmt->bindValue(":keywordA", "%" . $keyword . "%");
    $stmt->bindValue(":keywordB", "%" . $keyword . "%");
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $rows = array();
    while($row = $res->fetchArray()) {
      array_push($rows, $row);
    }
    return array("success" => "true", "hops" => $rows);
  }
}

?>
