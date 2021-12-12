using Athlimage.ViewModels;
using System.ComponentModel;
using Xamarin.Forms;

namespace Athlimage.Views
{
    public partial class ItemDetailPage : ContentPage
    {
        public ItemDetailPage()
        {
            InitializeComponent();
            BindingContext = new ItemDetailViewModel();
        }
    }
}