using MongoDB.Bson;
using MongoDB.Driver;
using Zad1.Models;

namespace Zad1.Repositories
{
    public class ContactRepository
    {
        private readonly IMongoCollection<Contact> _collection;

        public ContactRepository(string connectionString, string databaseName, string collectionName)
        {
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);
            _collection = database.GetCollection<Contact>(collectionName);
        }
        
        public List<Contact> GetAllContacts()
        {
            return _collection.Find(new BsonDocument()).ToList();
        }
    }
}
