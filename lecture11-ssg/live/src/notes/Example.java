interface Point {
  float getX();
  float getY();
  void setX(float x);
  void setY(float y);
}

interface HasHealth {
  float getHealth();
}

class Player implements Point, HasHealth {

  float x;
  float y;
  float health;

  Player(float x, float y, float health) {
    this.x = x;
    this.y = y;
    this.health = health;
  }

  @Override
  public float getX() {
    return x;
  }

  @Override
  public float getY() {
    return y;
  }

  public float getHealth() {
    return this.health;
  }

  @Override
  public void setX(float x) {
    this.x = x;
  }

  @Override
  public void setY(float y) {
    this.y = y;
  }
  
}

public class Example {
  public static void main() {
    printCoords(new Player(100,200, 99));
  }

  public static void printCoords(Point p) {
    System.out.println(p.getX() + ", " + p.getY());
  }

  public static void moveEntity(Point p, Point newP) {
    p.setX(newP.getX());
    p.setY(newP.getY());
  }
}