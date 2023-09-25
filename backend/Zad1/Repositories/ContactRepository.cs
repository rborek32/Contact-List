using System.Runtime.Intrinsics.X86;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
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
        
        public Contact GetUserByEmail(string login)
        {
            return _collection.Find(user => user.Email == login).FirstOrDefault();
        }

        public async Task AddContact<T>(Contact contact)
        { 
            await _collection.InsertOneAsync(contact);
        }

        public async Task UpdateContact<T>(Contact contact)
        {
            var filter = Builders<Contact>.Filter.Eq(x => x.Id, contact.Id);
            await _collection.DeleteOneAsync(filter);
        }
        
        public async Task DeleteContact<T>(Contact contact)
        {
            var filter = Builders<Contact>.Filter.Eq(x => x.Id, contact.Id);
            await _collection.DeleteOneAsync(filter);
        }
    }
}
