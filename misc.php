<?php

class Misc {
  public $db = null;
  public function __construct($location) {
    $this->db = new SQLite3($location);
    $this->db->query("CREATE TABLE IF NOT EXISTS miscs (id INTEGER PRIMARY KEY, sender TEXT, name TEXT, type TEXT, used TEXT, utime TEXT, used_note TEXT, " .
                    "note TEXT, FOREIGN KEY(sender) REFERENCES account(id));");
  }
  public function add($data) {
    $slimit = 90;
    $canBeAdded = true;
    $stmt = $this->db->prepare("SELECT * FROM miscs WHERE type = :type;");
    $stmt->bindValue(":type", $data['misc-type']);
    $res = $stmt->execute();
    if($res != null) {
      while($row = $res->fetchArray()) {
        $similarity = 0;
        similar_text($row['name'], $data['misc-name'], $similarity);
        if($similarity > $slimit) {
          $canBeAdded = false;
          break;
        }
      }
    }
    if($canBeAdded == false) {
      return array("success" => "false", "reason" => "Too similar name to another existing misc wich has same used");
    }
    // Since it can be added then do the long insert into query.
    $stmt = $this->db->prepare("INSERT INTO miscs (sender, name, type, used, utime, used_note, note" .
                              ") VALUES (:sender, :name, :type, :used, :utime, :used_note, :note); ");
    $stmt->bindValue(":sender", $data['uid']);
    $stmt->bindValue(":name", $data['misc-name']);
    $stmt->bindValue(":type", $data['misc-type']);
    $stmt->bindValue(":used", $data['misc-used']);
    $stmt->bindValue(":utime", $data['misc-time']);
    $stmt->bindValue(":used_note", $data['misc-used-note']);
    $stmt->bindValue(":note", $data['misc-note']);
    $res = $stmt->execute();
    if($res != false) {
      return array("success" => "true");
    } else {
      return array("success" => "false", "reason" => "For some reason insertion to database failed.");
    }
  }

  public function delete($id) {
    $stmt = $this->db->prepare("DELETE FROM miscs WHERE id = :id");
    $stmt->bindValue(":id", $id);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    return array("success" => "true");
  }

  public function getListByType($type) {
    $stmt = $this->db->prepare("SELECT * FROM miscs WHERE type = :type;");
    $stmt->bindValue(":type", $type);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $rows = array();
    while($row = $res->fetchArray()) {
      array_push($rows, $row);
    }
    return array("success" => "true", "miscs" => $rows);
  }

  public function getListByKeyword($type, $keyword) {
    if($keyword == "") {
      return $this->getListByType($type);
    }
    $stmt = $this->db->prepare("SELECT * FROM miscs WHERE type = :type AND (name LIKE :keywordA);");
    $stmt->bindValue(":type", $type);
    $stmt->bindValue(":keywordA", "%" . $keyword . "%");
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $rows = array();
    while($row = $res->fetchArray()) {
      array_push($rows, $row);
    }
    return array("success" => "true", "miscs" => $rows);
  }
}

?>
