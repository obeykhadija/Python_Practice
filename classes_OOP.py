#Classes and OOP
#Vending Machine Code
class Soda_Machine:
  paid = False
  balance = 0

  def eject_soda(self):
    if self.paid == False:
      print('Please insert money')
    else:
      print('Enjoy the soda!')

  def pay(self, amount):
    self.balance += amount
    
  def select_soda(self):
    if self.balance >= 1:
      self.paid = True
      self.balance -= 1
    else:
      self.paid = False

soda = Soda_Machine()
soda.pay(1)
soda.select_soda()
soda.eject_soda()

#Archery Game
class Archer:
    def __init__(self):
        self.arrows = 10
        self.points = 0
        self.empty = False

    def shoot(self):
        if self.arrows > 0:
            print('Aim... and shoot!')
            self.arrows -= 1
        else:
            self.empty = True
    
    def bullseye(self):
        self.points +=3
    
    def reload(self):
        if self.empty == True:
            self.arrows = 10
            self.empty = False

archer = Archer()
for arrow in range(1,archer.arrows):
    archer.shoot()
    archer.bullseye()
    archer.reload()
print(archer.points)

#Role Playing Game (RPG)
class Player:
  def __init__(self, name):
    self.name = name

class Computer(Player):
  def __init__(self):
    super().__init__("NPC")

  def respond(self, player):
    print("Hello", player.name, "I am", self.name)

class User(Player):
  def __init__(self, name, level):
    super().__init__(name)
    self.level = level

  def greet(self):
    print("Hi! What is your name?")

computer = Computer()
user = User("User", 1)
user.greet()
computer.respond(user)

#Automobile Game
class Automobile:
  def go(self):
    print('Racing forward')

  def stop(self):
    print('Stopping')

class Motorcycle(Automobile):
  def wheelie(self):
    print('Popping a wheelie')

class Racecar(Automobile):
  def reverse(self):
    print('Reversing')

  def goTo100(self):
    print('Increasing to 100 mph')

motorcycle = Motorcycle()
racecar = Racecar()
motorcycle.go()
motorcycle.wheelie()
racecar.goTo100()
racecar.stop()

#Food Delivery App
class FoodDelivery: 
  def __init__(self, number, items): 
    self.number = number 
    self.items = items 
 
  def submit_order(self): 
    print(f"Submitting order: {self.number}") 
 
  def make_food(self, item): 
    print(f"Made {item}") 
 
  def package_item(self, item): 
    print(f"Packaging {item}") 
     
  def complete_order(self): 
    self.submit_order() 
    for i in self.items: 
      self.make_food(i) 
      self.package_item(i) 
    print("Delivering order", self.number)
items = ["pizza", "shawarma", "sushi"]
number = 3
food_delivery = FoodDelivery(number, items)
food_delivery.complete_order()

#Perimeter Calculator
class Polygon:
  def perimeter(self):
    print("Perimeter")

class Rectangle(Polygon):
  def __init__(self, length, width):
    self.length = length
    self.width = width
  def perimeter(self):
    return 2 * (self.length + self.width)

class Square(Polygon):
  def __init__(self, side):
    self.side = side
  def perimeter(self):
    return 4 * self.side

class Triangle(Polygon):
  def __init__(self, a, b, c):
    self.a = a
    self.b = b
    self.c = c
  def perimeter(self):
    return self.a + self.b + self.c
 
polygon = Polygon()
rectangle = Rectangle(4,6)
square = Square(4)
triangle = Triangle(6,6,6)
print('Perimeter of Rectangle = ', rectangle.perimeter())
print('Perimeter of Square =      ', square.perimeter())
print('Perimeter of Triangle =   ', triangle.perimeter())
