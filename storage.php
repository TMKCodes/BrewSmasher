<?php

class Storage {
  public $db = null;
  public function __construct($location) {
    $this->db = new SQLite3($location);
    $this->db->query("CREATE TABLE IF NOT EXISTS storage (id INTEGER PRIMARY KEY, uid TEXT, item INTEGER, type INTEGER, amount INTEGER, FOREIGN KEY(uid) REFERENCES account(id));");
  }

  public function add($uid, $item, $type, $amount) {
    /* item type is for differentiating between equipment and ingredients
     * 0 = ingredients
     * 1 = equipments
     */
    $stmt = $this->db->prepare("SELECT * FROM storage WHERE uid = :uid AND item = :item AND type = :type;");
    $stmt->bindValue(":uid", $uid);
    $stmt->bindValue(":item", $item);
    $stmt->bindValue(":type", $type);
    $res = $stmt->execute();
    $item = null;
    while($row = $res->fetchArray()) {
      if($row['uid'] == $uid && $row['item'] == $item && $row['type'] == $type) {
        $item = $row;
        break;
      }
    }
    if($item != null) {
      $amount = $item['amount'] + $amount;
      $stmt = $this->db->prepare("UPDATE storage SET amount = :amount WHERE id = :id AND uid = :uid;");
      $stmt->bindValue(":amount", $amount);
      $stmt->bindValue(":id", $item['id']);
      $stmt->bindValue(":uid", $uid);
      $res = $stmt->execute();
      if($res != false) {
        return array("success" => "true");
      } else {
        return array("success" => "false", "error" => "Failed to insert data to storage.");
      }
    } else {
      $stmt = $this->db->prepare("INSERT INTO storage (uid, item, type, amount) VALUES (:uid, :item, :type, :amount);");
      $stmt->bindValue(":uid", $uid);
      $stmt->bindValue(":item", $item);
      $stmt->bindValue(":type", $type);
      $stmt->bindValue(":amount", $amount);
      $res = $stmt->execute();
      if($res != false) {
        return array("success" => "true");
      } else {
        return array("success" => "false", "error" => "Failed to insert data to storage.");
      }
    }
  }

  public function get($uid) {
    $stmt = $this->db->prepare("SELECT * FROM storage WHERE uid = :uid;");
    $stmt->bindValue(":uid", $uid);
    $res = $stmt->execute();
    if($res != false) {
      $rows = array();
      while($row = $res->fetchArray()) {
        array_push($rows, $row);
      }
      return array("success" => "true", "storage" => $rows);
    } else {
      return array("success" => "false", "error" => "Failed to select from storage.");
    }
  }

  public function delete($id, $uid) {
    $stmt = $this->db->prepare("DELETE FROM storage WHERE id = :id AND uid = :uid;");
    $stmt->bindValue(":id", $id);
    $stmt->bindValue(":uid", $uid);
    $res = $stmt->execute();
    if($res != false) {
      return array("success" => "true");
    } else {
      return array("success" => "false", "reason" => "Database query failed.");
    }
  }

}

?>
