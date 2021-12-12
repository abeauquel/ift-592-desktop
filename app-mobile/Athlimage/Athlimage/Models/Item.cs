using System;

namespace Athlimage.Models
{
    public class Item
    {
        public bool newItem;
        public string Id { get; set; }
        public string Photo1 { get; set; }
        public string Photo2 { get; set; }
        public string Photo3 { get; set; }
        public string Format { get; set; }
        public string Forfait { get; set; }
        public string Prenom { get; set; }
        public string Nom { get; set; }
        public string Adresse { get; set; }
        public string Ville { get; set; }
        public string Pays { get; set; }
        public string Province { get; set; }
        public string CodePostale { get; set; }
        public string Telephone { get; set; }
        public bool Livraison { get; set; }
        public Item()
        {
            newItem = true;
            Photo1 = "";
            Photo2 = "";
            Photo3 = "";
            Format = "";
            Forfait = "";
            Prenom = "";
            Nom = "";
            Adresse = "";
            Ville = "";
            Pays = "";
            Province = "";
            CodePostale = "";
            Telephone = "";
            Livraison = false;
        }

        public Item(String p1, String p2, String p3, String form, String forf, String pre, String n, String addr, String vi, String py, String pr, String codep, String tele, bool livraison)
        {
            newItem = false;
            Photo1 = p1;
            Photo2 = p2;
            Photo3 = p3;
            Format = form;
            Forfait = forf;
            Prenom = pre;
            Nom = n;
            Adresse = addr;
            Ville = vi;
            Pays = py;
            Province = pr;
            CodePostale = codep;
            Telephone = tele;
            Livraison = livraison;
        }

        public Item(JsonItem json)
        {
            newItem = false;
            int i = json.photos.Count;
            if (i > 0)
            {
                Photo1 = json.photos[0];
            }
            if (i > 1)
            {
                Photo2 = json.photos[1];
            }
            if (i > 2)
            {
                Photo3 = json.photos[2];
            }
            Format = json.format;
            Forfait = json.forfait;
            Prenom = json.prenom;
            Nom = json.nom;
            Adresse = json.adresse;
            Ville = json.ville;
            Pays = json.pays;
            Province = json.province;
            CodePostale = json.codePostale;
            Telephone = json.telephone;
            Livraison = json.livraison;
        }

        public String itemToJson(String action)
        {
            var jItem = new JsonItem(this);
            jItem.action = action;
            return Newtonsoft.Json.JsonConvert.SerializeObject(jItem);
        }
        
    }
}
