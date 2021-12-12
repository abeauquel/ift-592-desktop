using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;
using System.Threading.Tasks;

namespace Athlimage.BluetoothLib
{

    public interface IBluetooth
    {


        string sendData(string data);

        string getListCommande();
        string getPictureCommade();

        List<string> getDevices();

        bool connect(string deviceMac);

        string getStatus();

        string disconnect();

        bool isConnected();
    }

    public class Bluetooth
    {
        private static IBluetooth service;
        public static IBluetooth GetBluetooth()
        {
            if (service == null)
            {
                service = DependencyService.Get<IBluetooth>();
            }
            return service;
        }
    }


}
