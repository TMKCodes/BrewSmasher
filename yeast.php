<?php

class Yeast {
  public $db = null;
  public function __construct($location) {
    $this->db = new SQLite3($location);
    $this->db->query("CREATE TABLE IF NOT EXISTS yeasts (id INTEGER PRIMARY KEY, sender TEXT, name TEXT, type TEXT, form TEXT, laboratory TEXT, pid TEXT, " .
                    "min_temperature TEXT, max_temperature TEXT, flocculation TEXT, attenuation TEXT, max_reuse TEXT, " .
                    "note TEXT, FOREIGN KEY(sender) REFERENCES account(id));");
  }
  public function add($data) {
    $slimit = 90;
    $canBeAdded = true;
    $stmt = $this->db->prepare("SELECT * FROM yeasts WHERE form = :form;");
    $stmt->bindValue(":form", $data['yeast-form']);
    $res = $stmt->execute();
    if($res != null) {
      while($row = $res->fetchArray()) {
        $similarity = 0;
        similar_text($row['name'], $data['yeast-name'], $similarity);
        if($similarity > $slimit) {
          $canBeAdded = false;
          break;
        }
      }
    }
    if($canBeAdded == false) {
      return array("success" => "false", "reason" => "Too similar name to another existing yeast wich has same form");
    }
    // Since it can be added then do the long insert into query.
    $stmt = $this->db->prepare("INSERT INTO yeasts (sender, name, form, laboratory, pid, " .
                              "type, min_temperature, max_temperature, flocculation, attenuation, max_reuse, " .
                              "note" .
                              ") VALUES (:sender, :name, :form, :laboratory, :pid, " .
                              ":type, :min_temperature, :max_temperature, :flocculation, :attenuation, :max_reuse, " .
                              ":note); ");
    $stmt->bindValue(":sender", $data['uid']);
    $stmt->bindValue(":name", $data['yeast-name']);
    $stmt->bindValue(":form", $data['yeast-form']);
    $stmt->bindValue(":laboratory", $data['yeast-laboratory']);
    $stmt->bindValue(":pid", $data['yeast-product-id']);
    $stmt->bindValue(":type", $data['yeast-type']);
    $stmt->bindValue(":min_temperature", $data['yeast-min-temperature']);
    $stmt->bindValue(":max_temperature", $data['yeast-max-temperature']);
    $stmt->bindValue(":flocculation", $data['yeast-flocculation']);
    $stmt->bindValue(":attenuation", $data['yeast-attenuation']);
    $stmt->bindValue(":max_reuse", $data['yeast-max-reuse']);
    $stmt->bindValue(":note", $data['yeast-note']);
    $res = $stmt->execute();
    if($res != false) {
      return array("success" => "true");
    } else {
      return array("success" => "false", "reason" => "For some reason insertion to database failed.");
    }
  }

  public function modify($data) {
    $stmt = $this->db->prepare("SELECT * FROM yeasts WHERE id = :id;");
    $stmt->bindValue(":id", $data["yeast-id"]);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $rows = array();
    while($row = $res->fetchArray()) {
      array_push($rows, $row);
    }
    // TODO: Use $rows to save the backup of fermentable.
    $stmt = $this->db->prepare("UPDATE yeasts " .
                                "SET sender = :sender, " .
                                "name = :name, " .
                                "form = :form, " .
                                "laboratory = :laboratory, " .
                                "pid = :pid, " .
                                "type = :type, " .
                                "min_temperature = :min_temperature, " .
                                "max_temperature = :max_temperature, " .
                                "flocculation = :flocculation, " .
                                "attenuation = :attenuation, " .
                                "max_reuse = :max_reuse, " .
                                "note = :note " .
                                "WHERE id = :id;");
    $stmt->bindValue(":sender", $data['uid']);
    $stmt->bindValue(":name", $data['yeast-name']);
    $stmt->bindValue(":form", $data['yeast-form']);
    $stmt->bindValue(":laboratory", $data['yeast-laboratory']);
    $stmt->bindValue(":pid", $data['yeast-product-id']);
    $stmt->bindValue(":type", $data['yeast-type']);
    $stmt->bindValue(":min_temperature", $data['yeast-min-temperature']);
    $stmt->bindValue(":max_temperature", $data['yeast-max-temperature']);
    $stmt->bindValue(":flocculation", $data['yeast-flocculation']);
    $stmt->bindValue(":attenuation", $data['yeast-attenuation']);
    $stmt->bindValue(":max_reuse", $data['yeast-max-reuse']);
    $stmt->bindValue(":note", $data['yeast-note']);
    $stmt->bindValue(":id", $data["yeast-id"]);
    $res = $stmt->execute();
    if($res != false) {
      return array("success" => "true");
    } else {
      return array("success" => "false", "reason" => "For some reason update failed.");
    }
  }

  public function delete($id) {
    $stmt = $this->db->prepare("DELETE FROM yeasts WHERE id = :id");
    $stmt->bindValue(":id", $id);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    return array("success" => "true");
  }

  public function getListByType($type) {
    $stmt = $this->db->prepare("SELECT * FROM yeasts WHERE type = :type;");
    $stmt->bindValue(":type", $type);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $rows = array();
    while($row = $res->fetchArray()) {
      array_push($rows, $row);
    }
    return array("success" => "true", "yeasts" => $rows);
  }

  public function getListByKeyword($type, $keyword) {
    if($keyword == "") {
      return $this->getListByType($type);
    }
    $stmt = $this->db->prepare("SELECT * FROM yeasts WHERE type = :type AND (name LIKE :keywordA OR form LIKE :keywordB OR laboratory LIKE :keywordC);");
    $stmt->bindValue(":type", $type);
    $stmt->bindValue(":keywordA", "%" . $keyword . "%");
    $stmt->bindValue(":keywordB", "%" . $keyword . "%");
    $stmt->bindValue(":keywordC", "%" . $keyword . "%");
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $rows = array();
    while($row = $res->fetchArray()) {
      array_push($rows, $row);
    }
    return array("success" => "true", "yeasts" => $rows);
  }
}

?>
