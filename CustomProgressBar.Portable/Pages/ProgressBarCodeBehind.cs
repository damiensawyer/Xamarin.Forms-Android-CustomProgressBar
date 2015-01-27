using Xamarin.Forms;
using CustomProgressBar.CustomControls;

namespace CustomProgressBar
{
	/// <summary>
	/// Note that this class is just another way of doing what is done in the XAML... see app.cs to choose which one. 
	/// </summary>
	public class ProgressBarCodeBehind : ContentPage
	{
		public ProgressBarCodeBehind ()
		{
			var progressBar = new CircularProgress {
				ProgressColor = Color.FromHex("3498DB"),
				ProgressBackgroundColor = Color.FromHex("B4BCBC"),
				WidthRequest = 300,
				HeightRequest = 300
			};

			var increase = new Button { Text = "+5 cbehind" };
			var decrease = new Button { Text = "-5 cbehind" };
			var indeterminate = new Button { Text = "Indeterminate" };

			increase.Clicked += (sender, args) => progressBar.Progress += 5;
			decrease.Clicked += (sender, args) => progressBar.Progress -= 5;

			indeterminate.Clicked += (sender, args) => {
				progressBar.Indeterminate = !progressBar.Indeterminate;
			};

			var actionsStack = new StackLayout {
				Orientation = StackOrientation.Horizontal,
				Spacing = 10,
				HorizontalOptions = LayoutOptions.Center,
				Children = {increase, decrease, indeterminate}
			};


			var slider = new Slider (50, 150, 100);

			slider.ValueChanged += (sender, args) => progressBar.IndeterminateSpeed = (int)slider.Value;


			var mainStack = new StackLayout {
				Spacing = 10,
				Padding = 10,
				Children = {actionsStack, slider, progressBar }
			};


			Content = mainStack;

		}
	}
}

