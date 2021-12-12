using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace Athlimage.Models
{
    public class JsonItem
    {
        public string sender { get; set; }
        public string receiver { get; set; }
        public string action { get; set; }
        public string id { get; set; }
        public string forfait { get; set; }
        public List<string> photos { get; set; }
        public bool livraison { get; set; }
        public string prenom { get; set; }
        public string nom { get; set; }
        public string adresse { get; set; }
        public string ville { get; set; }
        public string pays { get; set; }
        public string province { get; set; }
        public string codePostale { get; set; }
        public string telephone { get; set; }
        public string format { get; set; }
        
        public JsonItem(Item item)
        {
            this.sender = "phone";
            this.receiver = "desktop";
            this.action = "";
            this.id = item.Id;
            this.forfait = item.Forfait;
            this.photos = new List<String>();
            this.photos.Add(item.Photo1);
            if (item.Photo2 != null)
            {
                this.photos.Add(item.Photo2);
            }
            if (item.Photo3 != null)
            {
                this.photos.Add(item.Photo3);
            }
            this.livraison = item.Livraison;
            this.prenom = item.Prenom;
            this.nom = item.Nom;
            this.adresse = item.Adresse;
            this.ville = item.Ville;
            this.pays = item.Pays;
            this.province = item.Province;
            this.codePostale = item.CodePostale;
            this.telephone = item.Telephone;
            this.format = item.Format;
        }

        public JsonItem()
        {

        }

        public Item toItem()
        {
            return new Item(this);
        }
    }
}
