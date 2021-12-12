using Athlimage.BluetoothLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace Athlimage.ViewModels
{
    public class Parametre : BaseViewModel
    {

        private bool connecte;
        private IBluetooth bluetooth;
        public Parametre()
        {
            Title = "Parametre";
            OpenWebCommand = new Command(async () => await Browser.OpenAsync("https://aka.ms/xamarin-quickstart"));
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

        public ICommand OpenWebCommand { get; }
    }
}