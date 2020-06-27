<?php

class Fermentable {
  public $db = null;
  public function __construct($location) {
    $this->db = new SQLite3($location);
    $this->db->query("CREATE TABLE IF NOT EXISTS fermentables (id INTEGER PRIMARY KEY, sender TEXT, name TEXT, type TEXT, specific_gravity TEXT, yield TEXT, color TEXT, after_boil TEXT, " .
                      "origin TEXT, supplier TEXT, coarse_fine_diff TEXT, moisture TEXT, diastatic_power TEXT, protein TEXT, max_in_batch TEXT, " .
                      "recommended_mash TEXT, note TEXT, FOREIGN KEY(sender) REFERENCES account(id));");
  }
  public function add($data) {
    // Select everything with the same origing and check if they have same Supplier
    // and then check the similarity of the name. Similarity limit can be changed later.
    // This is to disable people from adding same fermentable ingredients.
    $slimit = 90;
    $canBeAdded = true;
    $stmt = $this->db->prepare("SELECT * FROM fermentables WHERE origin = :origin;");
    $stmt->bindValue(":origin", $data['fermentable-origin']);
    $res = $stmt->execute();
    if($res != null) {
      while($row = $res->fetchArray()) {
        if(strtolower($row['supplier']) == strtolower($data['fermentable-supplier'])) {
          $similarity = 0;
          similar_text($row['name'], $data['fermentable-name'], $similarity);
          if($similarity > $slimit) {
            $canBeAdded = false;
            break;
          }
        }
      }
    }
    if($canBeAdded == false) {
      return array("success" => "false", "reason" => "Too similar name to another existing Fermentable wich has same origin and supplier.");
    }
    // Since it can be added then do the long insert into query.
    $stmt = $this->db->prepare("INSERT INTO fermentables (sender, name, type, yield, color, after_boil, origin, supplier, coarse_fine_diff, " .
                              "moisture, diastatic_power, protein, max_in_batch, recommended_mash, note, specific_gravity" .
                              ") VALUES (:sender, :name, :type, :yield, :color, :after_boil, :origin, :supplier, :coarse_fine_diff, " .
                              ":moisture, :diastatic_power, :protein, :max_in_batch, :recommended_mash, :note, :specific_gravity); ");
    $stmt->bindValue(":sender", $data['uid']);
    $stmt->bindValue(":name", $data['fermentable-name']);
    $stmt->bindValue(":type", $data['fermentable-type']);
    $stmt->bindValue(":yield", $data['fermentable-yield']);
    $stmt->bindValue(":color", $data['fermentable-color']);
    $stmt->bindValue(":after_boil", $data['fermentable-after-boil']);
    $stmt->bindValue(":origin", $data['fermentable-origin']);
    $stmt->bindValue(":supplier", $data['fermentable-supplier']);
    $stmt->bindValue(":coarse_fine_diff", $data['fermentable-coarse-fine-diff']);
    $stmt->bindValue(":moisture", $data['fermentable-moisture']);
    $stmt->bindValue(":diastatic_power", $data['fermentable-diastatic-power']);
    $stmt->bindValue(":protein", $data['fermentable-protein']);
    $stmt->bindValue(":max_in_batch", $data['fermentable-max-in-batch']);
    $stmt->bindValue(":recommended_mash", $data['fermentable-recommended-mash']);
    $stmt->bindValue(":note", $data['fermentable-note']);
    $stmt->bindValue(":specific_gravity", $data['fermentable-specific-gravity']);
    $res = $stmt->execute();
    if($res != false) {
      return array("success" => "true");
    } else {
      return array("success" => "false", "reason" => "For some reason insertion to database failed.");
    }
  }

  public function modify($data) {
    $stmt = $this->db->prepare("SELECT * FROM fermentables WHERE id = :id;");
    $stmt->bindValue(":id", $data["fermentable-id"]);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $rows = array();
    while($row = $res->fetchArray()) {
      array_push($rows, $row);
    }
    // TODO: Use $rows to save the backup of fermentable.
    $stmt = $this->db->prepare("UPDATE fermentables " .
                                "SET sender = :sender," .
                                "name = :name," .
                                "type = :type," .
                                "yield = :yield," .
                                "color = :color," .
                                "after_boil = :after_boil," .
                                "origin = :origin," .
                                "supplier = :supplier," .
                                "coarse_fine_diff = :coarse_fine_diff," .
                                "moisture = :moisture, " .
                                "diastatic_power = :diastatic_power,"  .
                                "protein = :protein," .
                                "max_in_batch = :max_in_batch," .
                                "recommended_mash = :recommended_mash,"  .
                                "note = :note, " .
                                "specific_gravity = :specific_gravity " .
                                "WHERE id = :id;");
    $stmt->bindValue(":sender", $data['uid']);
    $stmt->bindValue(":name", $data['fermentable-name']);
    $stmt->bindValue(":type", $data['fermentable-type']);
    $stmt->bindValue(":yield", $data['fermentable-yield']);
    $stmt->bindValue(":color", $data['fermentable-color']);
    $stmt->bindValue(":after_boil", $data['fermentable-after-boil']);
    $stmt->bindValue(":origin", $data['fermentable-origin']);
    $stmt->bindValue(":supplier", $data['fermentable-supplier']);
    $stmt->bindValue(":coarse_fine_diff", $data['fermentable-coarse-fine-diff']);
    $stmt->bindValue(":moisture", $data['fermentable-moisture']);
    $stmt->bindValue(":diastatic_power", $data['fermentable-diastatic-power']);
    $stmt->bindValue(":protein", $data['fermentable-protein']);
    $stmt->bindValue(":max_in_batch", $data['fermentable-max-in-batch']);
    $stmt->bindValue(":recommended_mash", $data['fermentable-recommended-mash']);
    $stmt->bindValue(":note", $data['fermentable-note']);
    $stmt->bindValue(":specific_gravity", $data['fermentable-specific-gravity']);
    $stmt->bindValue(":id", $data["fermentable-id"]);
    $res = $stmt->execute();
    if($res != false) {
      return array("success" => "true");
    } else {
      return array("success" => "false", "reason" => "For some reason update failed.");
    }
  }

  public function delete($id) {
    $stmt = $this->db->prepare("DELETE FROM fermentables WHERE id = :id");
    $stmt->bindValue(":id", $id);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    return array("success" => "true");
  }

  public function getListByType($type) {
    $stmt = $this->db->prepare("SELECT * FROM fermentables WHERE type = :type;");
    $stmt->bindValue(":type", $type);
    $res = $stmt->execute();
    if($res == null) {
      return array("success" => "false", "reason" => "Database query failed.");
    }
    $rows = array();
    while($row = $res->fetchArray()) {
      array_push($rows, $row);
    }
    return array("success" => "true", "fermentables" => $rows);
  }

  public function getListByKeyword($type, $keyword) {
    if($keyword == "") {
      return $this->getListByType($type);
    }
    $stmt = $this->db->prepare("SELECT * FROM fermentables WHERE type = :type AND (name LIKE :keywordA OR origin LIKE :keywordB OR supplier LIKE :keywordC);");
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
    return array("success" => "true", "fermentables" => $rows);
  }
}

?>
