import pymysql
from django.db import models
from django.contrib.auth.models import User

def get_university_rankings(): 
    db_settings = {
        "host": 'localhost',
        "user": 'root',
        "password": 'qiqi050621',
        "database": 'qsrankings',
        "charset": 'utf8mb4',
        "cursorclass": pymysql.cursors.DictCursor  # Use DictCursor to get data as dictionaries
    }

    # Create a connection to the database
    connection = pymysql.connect(**db_settings)
    
    try:
        # Create a cursor object using a context manager
        with connection.cursor() as cursor:
            # SQL query to execute
            sql = "SELECT * FROM university_rankings"
            cursor.execute(sql)
            # Fetch all rows from the last executed query
            result = cursor.fetchall()
            return result
    finally:
        # Ensure that the connection is closed
        connection.close()

class UniversityRanking(models.Model): 
    ranking = models.IntegerField(primary_key=True)
    university_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'university_rankings'

    def __str__(self):
        return self.university_name
# Create your models here.
