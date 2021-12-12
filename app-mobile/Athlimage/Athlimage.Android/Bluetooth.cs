using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Athlimage.BluetoothLib;
using System.Threading.Tasks;
using Newtonsoft.Json;

[assembly: Xamarin.Forms.Dependency(typeof(IBluetooth))]
namespace Athlimage.Droid
{
    class Bluetooth : IBluetooth
    {

        public Bluetooth() : base(){}

        public string sendData(string data)
        {
            BluetoothService service = BluetoothService.GetBluetoothService();
            Task<string> task = service.SendMessage(data);
            return task.Result;
        }

        public List<string> getDevices()
        {
            //List<string> devices = new List<string>();
            var bluetoothDevices = Altimage.Bluetooth.BluetoothLib.Devices;
            List<string> devices = new List<string>();
            foreach (Android.Bluetooth.BluetoothDevice bluetoothDevice in bluetoothDevices)
            {
                devices.Add(bluetoothDevice.Name + ":" + bluetoothDevice.Address);
            }

            return devices;
        }

        public bool connect(string deviceMac)
        {
            bool response = Altimage.Bluetooth.BluetoothLib.Connect(deviceMac);
            return response;
        }

        private async Task<string> getMessage(string expectedAction)
        {
            List<string> response = await getCommande();
            foreach (string message in response)
            {
                dynamic data = JsonConvert.DeserializeObject(message);
                string action;
                try
                {
                    action = data.action;
                }
                catch (Exception e)
                {
                    continue;
                }

                if (action == expectedAction)
                {
                    return message;
                }
            }

            return "";
        }

        public string getListCommande()
        {
            BluetoothService service = BluetoothService.GetBluetoothService();
            string response = Altimage.Bluetooth.BluetoothLib.CommandeList;
            return response;
        }

        public string getPictureCommade()
        {
            string response = Altimage.Bluetooth.BluetoothLib.PictureCommande;
            return response;
        }

        //public async Task<string> getPictureCommade()
        //{
        //    string response = await getMessage("sendimage");
        //    return response;
        //}

        private async Task<List<string>> getCommande()
        {
            List<string> response = new List<string>();
            await Task.Run(() =>
            {
                bool ready = (bool) Altimage.Bluetooth.BluetoothLib.HasData();
                while (!ready)
                {
                    Task.Delay(1000);
                    ready = (bool)Altimage.Bluetooth.BluetoothLib.HasData();
                }

                var commande = Altimage.Bluetooth.BluetoothLib.ReadData();
                foreach(string item in commande)
                {
                    response.Add(item);
                }

            });
            return response;
        }

        public string getStatus()
        {
            return Altimage.Bluetooth.BluetoothLib.Status;
        }

        public string disconnect()
        {
            return Altimage.Bluetooth.BluetoothLib.Disconnect();
        }

        public bool isConnected()
        {
            return (bool)Altimage.Bluetooth.BluetoothLib.IsConnectected();
        }
    }
}
