using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using Athlimage.BluetoothLib;
using Xamarin.Essentials;
using System.Collections.Generic;

namespace Athlimage.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Parametre : ContentPage
    {
        private IBluetooth bluetooth;
        public Parametre()
        {
            InitializeComponent();
        }

        private void ScanButton_Clicked(object sender, EventArgs e)
        {
            foundBleDevicesListView.ItemsSource = null;
            bluetooth = Bluetooth.GetBluetooth();
            var devices = bluetooth.getDevices();
            foundBleDevicesListView.ItemsSource = devices;
        }

        private async void status(object sender, EventArgs e)
        {
            bluetooth = Bluetooth.GetBluetooth();
            string state = bluetooth.getStatus();
            await DisplayAlert("Notice", state.ToString(), "OK");
            bluetooth_response.Text = state;
        }
        private void FoundBluetoothDevicesListView_ItemTapped(object sender, ItemTappedEventArgs e)
        {
            bluetooth = Bluetooth.GetBluetooth();
            string selectedItem = e.Item as string;
            string mac = selectedItem.Substring(selectedItem.IndexOf(':') + 1);
            string connected = bluetooth.connect(mac).ToString();
            if(connected == "True")
            {
                bluetooth_response.Text = "Connected";
            }
            else
            {
                bluetooth_response.Text = "Not connected";
            }

        }

        private void SendButton_Clicked(object sender, EventArgs e)
        {
            bluetooth = Bluetooth.GetBluetooth();
            string data = send_text.Text;
            string response = bluetooth.sendData(data);
            bluetooth_response.Text = response;
        }

        private  void ReadButton_Clicked(object sender, EventArgs e)
        {
            bluetooth = Bluetooth.GetBluetooth();
            bluetooth_response.Text = bluetooth.getListCommande();
        }

        private void DisconnectButton_Clicked(object sender, EventArgs e)
        {
            bluetooth = Bluetooth.GetBluetooth();
            string response = bluetooth.disconnect();
            bluetooth_response.Text = response;
        }

        private void ConnectedButton_Clicked(object sender, EventArgs e)
        {
            bluetooth = Bluetooth.GetBluetooth();
            bool response = bluetooth.isConnected();
            bluetooth_response.Text = response.ToString();
        }

    }
}