using Athlimage.BluetoothLib;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace Athlimage.ViewModels
{
    public class PhotoViewModel : BaseViewModel
    {
        private bool connecte;
        private IBluetooth bluetooth;
        private Image photo;
        public PhotoViewModel()
        {
            Title = "Photos";
            //OpenWebCommand = new Command(async () => await Browser.OpenAsync("https://aka.ms/xamarin-quickstart"));
            string commande = "{action: 'getimage', sender: 'phone', reciver: 'desktop'}";
            bluetooth = Bluetooth.GetBluetooth();
            bluetooth.sendData(commande);

        }

        public bool Connecte
        {
            get => connected();
            set
            {
                SetProperty(ref connecte, value);
            }
        }

        public Image Phtoto
        {
            get => getPhoto();
            set
            {
                SetProperty(ref photo, value);
            }
        }

        private Image getPhoto()
        {
            dynamic commande;
            bluetooth = Bluetooth.GetBluetooth();
            commande = JsonConvert.DeserializeObject(bluetooth.getPictureCommade());
            
            return (Image)commande.image;

        }

        private bool connected()
        {
            bluetooth = Bluetooth.GetBluetooth();
            return !bluetooth.isConnected();
        }

        public ICommand OpenWebCommand { get; }
    }
}