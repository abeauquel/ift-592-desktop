using Athlimage.BluetoothLib;
using Athlimage.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace Athlimage.ViewModels
{
    public class PhotoViewModel : BaseViewModel
    {
        private bool connecte;
        private bool PhotoDossier = false;
        private IBluetooth bluetooth;
        private Dossier _selectedDossier;
        public Dossier dossier;
        public Command LoadDossierCommand { get; }
        public Command RetourCommand { get; }
        public ObservableCollection<Dossier> Dossiers { get; }
        public Command<Dossier> DossierTapped { get; }
        public PhotoViewModel()
        {
            Title = "Photos";
            Dossiers = new ObservableCollection<Dossier>();
            LoadDossierCommand = new Command(async () => await ExecuteLoadItemsCommand());
            //RetourCommand = new Command();

            DossierTapped = new Command<Dossier>(OnDossierSelected);
        }

        async Task ExecuteLoadItemsCommand()
        {
            IsBusy = true;
            try
            {
                Dossiers.Clear();
                String json = "{\"sender\":\"phone\",\"receiver\":\"desktop\",\"action\":\"getcommands\"}";
                String temp;
                List<string> data = new List<string>();
                var items = await DataStore.GetItemsAsync(true);
                if (true)
                {
                }
                else
                {
                    bluetooth = Bluetooth.GetBluetooth();
                    json  = bluetooth.sendData(json);
                    //data = await bluetooth.getData();
                    //json = await bluetooth.getData();
                    //json = json.Substring(json.IndexOf('\n') + 1);
                    var text = 0;
                }
                //json = "{\"action\":\"sendCommands\",\"sender\":\"desktop\",\"receiver\":\"phone\",\"values\":[{\"sender\":\"phone\",\"receiver\":\"desktop\",\"action\":\"create\",\"id\":1,\"forfait\":\"string\",\"photos\":[2331,3232,1233],\"livraison\":false,\"prenom\":\"string\",\"nom\":\"string\",\"adresse\":\"string\",\"ville\":\"string\",\"pays\":\"string\",\"province\":\"string\",\"codePostale\":\"string\",\"telephone\":\"string\",\"format\":\"string\",\"date\":1635977587564},{ \"sender\":\"phone\",\"receiver\":\"desktop\",\"action\":\"create\",\"id\":2,\"forfait\":\"string\",\"photos\":[],\"livraison\":false,\"prenom\":\"string\",\"nom\":\"string\",\"adresse\":\"string\",\"ville\":\"string\",\"pays\":\"string\",\"province\":\"string\",\"codePostale\":\"string\",\"telephone\":\"string\",\"format\":\"string\",\"date\":1635977606473}]}";
                /*ListeCommande list = Newtonsoft.Json.JsonConvert.DeserializeObject<ListeCommande>(data.ToString());
                foreach (var item in list.values)
                {
                
                }*/
                Dossiers.Add(new Dossier("test1.jpg"));
                Dossiers.Add(new Dossier("test2"));
                Dossiers.Add(new Dossier("test3"));
                Dossiers.Add(new Dossier("test4"));
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
            finally
            {
                IsBusy = false;
            }
        }

        public bool Connecte
        {
            get => connected();
            set
            {
                SetProperty(ref connecte, value);
            }
        }

        public bool afficherPhoto
        {
            get => PhotoDossier;
            set
            {
                SetProperty(ref PhotoDossier, value);
            }
        }

        public Dossier DossierEnCours
        {
            get => dossier;
            set
            {
                SetProperty(ref dossier, value);
            }
        }

        private bool connected()
        {
            bluetooth = Bluetooth.GetBluetooth();
            return !bluetooth.isConnected();
        }

        public Dossier SelectedDossier
        {
            get => _selectedDossier;
            set
            {
                SetProperty(ref _selectedDossier, value);
                OnDossierSelected(value);
            }
        }

        void OnDossierSelected(Dossier dossier)
        {       
            if (dossier == null)
            {
                PhotoDossier = false;
                return;
            }
            else if (dossier.nom.Contains(".jpg"))
            {
                //dossier.photo = true;
            } else
            {
                //dossier.photo = false;
            }
            ExecuteLoadItemsCommand();
            // This will push the ItemDetailPage onto the navigation stack
            //await Shell.Current.GoToAsync($"{nameof(NewItemPage)}?{nameof(NewItemViewModel.ItemId)}={item.Id}");
        }

        public void OnAppearing()
        {
            Connecte = connected();
            IsBusy = true;
            SelectedDossier = null;
        }

        public ICommand OpenWebCommand { get; }
    }
}