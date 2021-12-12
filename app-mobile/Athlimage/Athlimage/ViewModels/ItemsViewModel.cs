using Athlimage.Models;
using Athlimage.Views;
using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;
using Xamarin.Forms;
using Athlimage.BluetoothLib;
using System.IO;
using System.Collections.Generic;
using System.Threading;

namespace Athlimage.ViewModels
{
    public class ItemsViewModel : BaseViewModel
    {
        private IBluetooth bluetooth;
        private Item _selectedItem;
        private bool connecte;
        private bool firstTime = true;

        public ObservableCollection<Item> Items { get; }
        public Command LoadItemsCommand { get; }
        public Command AddItemCommand { get; }
        public Command<Item> ItemTapped { get; }

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

        public ItemsViewModel()
        {
            Title = "Browse";
            Items = new ObservableCollection<Item>();
            LoadItemsCommand = new Command(async () => await ExecuteLoadItemsCommand());

            ItemTapped = new Command<Item>(OnItemSelected);

            AddItemCommand = new Command(OnAddItem);
        }

        async Task ExecuteLoadItemsCommand()
        {
            IsBusy = true;
            try
            {
                Items.Clear();
                String json = "{\"sender\":\"phone\",\"receiver\":\"desktop\",\"action\":\"getcommands\"}";
                String temp;
                List<string> data = new List<string>();
                var items = await DataStore.GetItemsAsync(true);
                if(firstTime)
                {
                    firstTime = false;
                } else
                {
                    bluetooth = Bluetooth.GetBluetooth();
                    json = bluetooth.sendData(json);
                    //json = await bluetooth.getListCommande();
                    //json = json.Substring(json.IndexOf('\n') + 1);
                    var text = 0;
                }
                //json = "{\"action\":\"sendCommands\",\"sender\":\"desktop\",\"receiver\":\"phone\",\"values\":[{\"sender\":\"phone\",\"receiver\":\"desktop\",\"action\":\"create\",\"id\":1,\"forfait\":\"string\",\"photos\":[2331,3232,1233],\"livraison\":false,\"prenom\":\"string\",\"nom\":\"string\",\"adresse\":\"string\",\"ville\":\"string\",\"pays\":\"string\",\"province\":\"string\",\"codePostale\":\"string\",\"telephone\":\"string\",\"format\":\"string\",\"date\":1635977587564},{ \"sender\":\"phone\",\"receiver\":\"desktop\",\"action\":\"create\",\"id\":2,\"forfait\":\"string\",\"photos\":[],\"livraison\":false,\"prenom\":\"string\",\"nom\":\"string\",\"adresse\":\"string\",\"ville\":\"string\",\"pays\":\"string\",\"province\":\"string\",\"codePostale\":\"string\",\"telephone\":\"string\",\"format\":\"string\",\"date\":1635977606473}]}";
                ListeCommande list = Newtonsoft.Json.JsonConvert.DeserializeObject<ListeCommande>(json);
                foreach (var item in list.values)
                {
                    item.toItem();
                    Items.Add(item.toItem());
                }
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

        public void OnAppearing()
        {
            Connecte = connected();
            IsBusy = true;
            SelectedItem = null;
        }

        public Item SelectedItem
        {
            get => _selectedItem;
            set
            {
                SetProperty(ref _selectedItem, value);
                OnItemSelected(value);
            }
        }

        private async void OnAddItem(object obj)
        {
            await Shell.Current.GoToAsync(nameof(NewItemPage));
        }

        async void OnItemSelected(Item item)
        {
            if (item == null)
                return;

            // This will push the ItemDetailPage onto the navigation stack
            await Shell.Current.GoToAsync($"{nameof(NewItemPage)}?{nameof(NewItemViewModel.ItemId)}={item.Id}");
        }
    }
}