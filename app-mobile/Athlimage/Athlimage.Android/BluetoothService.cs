using System.Threading.Tasks;
using System.Threading;
using System;
using Newtonsoft.Json;



namespace Athlimage.Droid
{

    public class BluetoothService
    {
        private static BluetoothService service;
        private string listCommandAction = "sendcommands";
        private string pictureCommandAction = "sendimage";
        private string listSendCommandAction = "getcommands";
        private string pictureSendCommandAction = "getimage";

        public static BluetoothService GetBluetoothService()
        {
            if (service == null)
            {
                service = new BluetoothService();
            }
            return service;
        }

        private BluetoothService()
        {
        }

        public async Task<string> SendMessage(string message)
        {
            string response = "";
            string action = "";
            int timeout = 0;
            bool responseNeeded = false;
            if (message.Contains(listSendCommandAction))
            {
                action = listCommandAction;
                timeout = 500;
                responseNeeded = true;
            } else if(message.Contains(pictureSendCommandAction))
            {
                action = pictureCommandAction;
                timeout = 2000;
                //responseNeeded = true;
            }
           Altimage.Bluetooth.BluetoothLib.SendBluetoothData(message);
            if(responseNeeded)
            {
                while (response == "")
                {
                    Thread.Sleep(timeout);
                    response = getResponse(action);
                    if (response == "")
                    {
                        continue;
                    }
                    response = parseMessage(response, action);
                }
            }                 
            return response;
        }

        private string getResponse(string action)
        {
            string message = "";
            var commande = Altimage.Bluetooth.BluetoothLib.ReadData();
            foreach (string item in commande)
            {
                message += item;
            }
            if(message.Contains(action))
            {
                return message;
            }
            return "";
        }

        private string parseMessage(string message, string action)
        {
            char OUVERTURE = '{';
            char FERMETURE = '}';
            int actionIndex = message.IndexOf(action);
            int begininMessage = message.Substring(0, actionIndex).LastIndexOf(OUVERTURE);
            int endMessage = message.LastIndexOf(FERMETURE);
            int length = endMessage - begininMessage + 1;
            string response;
            response = message.Substring(begininMessage, length);
            try
            {
                dynamic validate = JsonConvert.DeserializeObject(response);
                string validateAction = validate.action;
                string validateSender = validate.sender;
                string validateReciver = validate.reciever;
                var validateValue = validate.value;
            } catch(Exception e)
            {
                response = "";
            }

            return response;
        }



    }

}
