using Athlimage.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using Athlimage.BluetoothLib;
using System.Text.RegularExpressions;

namespace Athlimage.ViewModels
{
    [QueryProperty(nameof(ItemId), nameof(ItemId))]
    public class NewItemViewModel : BaseViewModel
    {
        private IBluetooth bluetooth;
        private Item currentItem;
        private string itemId;
        public string Id { get; set; }
        private string text;
        private string description;
        private string listeForfait;
        private string listeFormat;
        private string photo1;
        private string photo2;
        private string photo3;
        private string prenom;
        private string nom;
        private string adresse;
        private string ville;
        private string pays;
        private string province;
        private string codePostale;
        private string telephone;
        private string forfait;
        private string format;
        private bool photo1Valide = false;
        private bool photo2Valide = false;
        private bool photo3Valide = false;
        private bool prenomValide = false;
        private bool nomValide = false;
        private bool adresseValide = false;
        private bool villeValide = false;
        private bool paysValide = false;
        private bool codePostaleValide = false;
        private bool telephoneValide = false;
        private bool forfaitValide = false;
        private bool adresseVisible = false;
        private string afficherAdresse;
        private bool connecte;

        public NewItemViewModel()
        {
            SaveCommand = new Command(OnSave, ValidateSave);
            CancelCommand = new Command(OnCancel);
            AdresseCommand = new Command(OnAdresse);
            AfficherAdresse = "Livraison";
            this.PropertyChanged +=
                (_, __) => SaveCommand.ChangeCanExecute();

        }

        public bool Connecte
        {
            get => connected();
            set
            {
                SetProperty(ref connecte, value);
            }
        }

        private bool connected()
        {
            bluetooth = Bluetooth.GetBluetooth();
            return !bluetooth.isConnected();
        }

        private bool ValidateSave()
        {
            missingValue();
            bool adresseValide;
            bool photoValide;
            if (forfait == "Triple")
            {
                photoValide = !String.IsNullOrWhiteSpace(photo1) && !String.IsNullOrWhiteSpace(photo2) && !String.IsNullOrWhiteSpace(photo3) && !String.IsNullOrWhiteSpace(forfait) && !String.IsNullOrWhiteSpace(format);
            } else if (forfait == "Cartes") 
            {
                photoValide = !String.IsNullOrWhiteSpace(photo1) && !String.IsNullOrWhiteSpace(photo2) && !String.IsNullOrWhiteSpace(forfait) && !String.IsNullOrWhiteSpace(format);
            } else
            {
                photoValide = !String.IsNullOrWhiteSpace(photo1) && !String.IsNullOrWhiteSpace(forfait) && !String.IsNullOrWhiteSpace(format);
            }
            if (adresseVisible)
            {
                adresseValide = !String.IsNullOrWhiteSpace(prenom) && !String.IsNullOrWhiteSpace(nom) && !String.IsNullOrWhiteSpace(adresse) && !String.IsNullOrWhiteSpace(ville)
                    && !String.IsNullOrWhiteSpace(pays) && !String.IsNullOrWhiteSpace(province) && !String.IsNullOrWhiteSpace(codePostale) && !String.IsNullOrWhiteSpace(telephone);
            } else
            {
                adresseValide = true;
            }
            return adresseValide && photoValide;
        }

       
        public bool AdresseVisible
        {
            get => adresseVisible;
            set => SetProperty(ref adresseVisible, value);
        }
        public string AfficherAdresse
        {
            get => afficherAdresse;
            set => SetProperty(ref afficherAdresse, value);
        }
        public string ListeForfait
        {
            get => listeForfait;
            set => SetProperty(ref listeForfait, value);
        }
        public string ListeFormat
        {
            get => listeFormat;
            set => SetProperty(ref listeFormat, value);
        }
        public string Photo1
        {
            get => photo1;
            set => SetProperty(ref photo1, value);
        }
        public string Photo2
        {
            get => photo2;
            set => SetProperty(ref photo2, value);
        }
        public string Photo3
        {
            get => photo3;
            set => SetProperty(ref photo3, value);
        }
        public string Prenom
        {
            get => prenom;
            set => SetProperty(ref prenom, value);
        }
        public string Nom
        {
            get => nom;
            set => SetProperty(ref nom, value);
        }
        public string Adresse
        {
            get => adresse;
            set => SetProperty(ref adresse, value);
        }
        public string Ville
        {
            get => ville;
            set => SetProperty(ref ville, value);
        }
        public string Pays
        {
            get => pays;
            set => SetProperty(ref pays, value);
        }
        public string Province
        {
            get => province;
            set => SetProperty(ref province, value);
        }
        public string CodePostale
        {
            get => codePostale;
            set => SetProperty(ref codePostale, value);
        }
        public string Telephone
        {
            get => telephone;
            set => SetProperty(ref telephone, value);
        }

        public string Forfait
        {
            get => forfait;
            set => SetProperty(ref forfait, value);
        }

        public string Format
        {
            get => format;
            set => SetProperty(ref format, value);
        }
        public string Text
        {
            get => text;
            set => SetProperty(ref text, value);
        }

        public string Description
        {
            get => description;
            set => SetProperty(ref description, value);
        }

        public bool Photo1Valide
        {
            get => photo1Valide;
            set => SetProperty(ref photo1Valide, value);
        }
        public bool Photo2Valide
        {
            get => photo2Valide;
            set => SetProperty(ref photo2Valide, value);
        }
        public bool Photo3Valide
        {
            get => photo3Valide;
            set => SetProperty(ref photo3Valide, value);
        }
        public bool ForfaitValide
        {
            get => forfaitValide;
            set => SetProperty(ref forfaitValide, value);
        }
        public bool PrenomValide
        {
            get => prenomValide;
            set => SetProperty(ref prenomValide, value);
        }
        public bool NomValide
        {
            get => nomValide;
            set => SetProperty(ref nomValide, value);
        }
        public bool AdresseValide
        {
            get => adresseValide;
            set => SetProperty(ref adresseValide, value);
        }
        public bool VilleValide
        {
            get => villeValide;
            set => SetProperty(ref villeValide, value);
        }
        public bool PaysValide
        {
            get => paysValide;
            set => SetProperty(ref paysValide, value);
        }
        public bool CodePValide
        {
            get => codePostaleValide;
            set => SetProperty(ref codePostaleValide, value);
        }
        public bool TelephoneValide
        {
            get => telephoneValide;
            set => SetProperty(ref telephoneValide, value);
        }

        public void missingValue()
        {
            string pattern = "^[ABCEGHJ-NPRSTVXY]{1}[0-9]{1}[ABCEGHJ-NPRSTV-Z]{1}[ ]?[0-9]{1}[ABCEGHJ-NPRSTV-Z]{1}[0-9]{1}$";
            Regex reg = new Regex(pattern, RegexOptions.IgnoreCase | RegexOptions.Compiled);
            if (CodePostale != null && reg.IsMatch(CodePostale))
            {
                CodePValide = false;
            }
            else
            {
                CodePValide = true;
            }
            /*if (Photo1 != null) {
                Photo1Valide = true; 
            } else
            {
                Photo1Valide = false;
            }
            if (Photo2 != null)
            {
                Photo2Valide = true;
            }
            else
            {
                Photo2Valide = false;
            }
            if (Photo3 != null)
            {
                Photo3Valide = true;
            }
            else
            {
                Photo3Valide = false;
            }
            if (Forfait != null) {
                ForfaitValide = true; 
            } 
            else
            {
                ForfaitValide = false;
            }
            if (Prenom != null)
            {
                PrenomValide = true;
            }
            else
            {
                PrenomValide = false;
            }
            if (Nom != null)
            {
                NomValide = true;
            }
            else
            {
                NomValide = false;
            }
            if (Adresse != null)
            {
                AdresseValide = true;
            }
            else
            {
                AdresseValide = false;
            }
            if (Ville != null)
            {
                VilleValide = true;
            }
            else
            {
                VilleValide = false;
            }
            if (Pays != null)
            {
                PaysValide = true;
            }
            else
            {
                PaysValide = false;
            }
            if (CodePostale != null)
            {
                CodePValide = true;
            }
            else
            {
                CodePValide = false;
            }
            if (Telephone != null)
            {
                TelephoneValide = true;
            }
            else
            {
                TelephoneValide = false;
            }*/
        }

        public Command SaveCommand { get; }
        public Command CancelCommand { get; }
        public Command AdresseCommand { get; }
        public Command ForfaitCommand { get; }

        private async void OnCancel()
        {
            // This will pop the current page off the navigation stack
            await Shell.Current.GoToAsync("..");
        }

        private void OnAdresse()
        {
            AdresseVisible = !AdresseVisible;
            if (AdresseVisible)
            {
                AfficherAdresse = "Sur Place";
            } else
            {
                AfficherAdresse = "Livraison"; //probleme ici a voir
            }
        }

        private async void OnSave()
        {
            bluetooth = Bluetooth.GetBluetooth();
            if (currentItem == null)
            {
                Item newItem = new Item()
                {
                    Id = Guid.NewGuid().ToString(),
                    Photo1 = Photo1,
                    Photo2 = Photo2,
                    Photo3 = Photo3,
                    Prenom = Prenom,
                    Forfait = Forfait,
                    Format = Format,
                    Nom = Nom,
                    Adresse = Adresse,
                    Ville = Ville,
                    Pays = Pays,
                    Province = Province,
                    CodePostale = CodePostale,
                    Telephone = Telephone,
                    Livraison = AdresseVisible
                };
                currentItem = newItem;
            }
            else
            {
                currentItem.newItem = false;
                currentItem.Photo1 = Photo1;
                currentItem.Photo2 = Photo2;
                currentItem.Photo3 = Photo3;
                currentItem.Prenom = Prenom;
                currentItem.Forfait = Forfait;
                currentItem.Format = Format;
                currentItem.Nom = Nom;
                currentItem.Adresse = Adresse;
                currentItem.Ville = Ville;
                currentItem.Pays = Pays;
                currentItem.Province = Province;
                currentItem.CodePostale = CodePostale;
                currentItem.Telephone = Telephone;
                currentItem.Livraison = AdresseVisible;
            }
            String json;
            if (currentItem.newItem)
            {
                await DataStore.AddItemAsync(currentItem);
                json = currentItem.itemToJson("create");
                bluetooth.sendData(json);
            } else
            {
                await DataStore.UpdateItemAsync(currentItem);
                json = currentItem.itemToJson("update");
                bluetooth.sendData(json);
            }

            await Shell.Current.GoToAsync("..");
        }

        public string ItemId
        {
            get
            {
                return itemId;
            }
            set
            {
                itemId = value;
                LoadItemId(value);
            }
        }

        public async void LoadItemId(string itemId)
        {
            try
            {
                var item = await DataStore.GetItemAsync(itemId);
                currentItem = item;
                Id = item.Id;
                Photo1 = item.Photo1;
                Photo2 = item.Photo2;
                Photo3 = item.Photo3;
                Forfait = item.Forfait;
                Format = item.Format;
                Prenom = item.Prenom;
                Nom = item.Nom;
                Adresse = item.Adresse;
                Ville = item.Ville;
                Pays = item.Pays;
                Province = item.Province;
                CodePostale = item.CodePostale;
                Telephone = item.Telephone;
                AdresseVisible = item.Livraison;
            }
            catch (Exception)
            {
                Debug.WriteLine("Failed to Load Item");
            }
        }
    }
}
