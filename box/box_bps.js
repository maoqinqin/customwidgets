(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="formBps">
			<fieldset>
				<legend>Color Properties</legend>
				<table>
					<tr>
						<td>Color</td>
						<td><input id="bps_color" type="text" size="10" maxlength="10"></td>
					</tr>
					<tr>
						<td>Percentage</td>
						<td><input id="bps_value" type="text" size="10" maxlength="3"></td>
					</tr>
				</table>
				<input type="submit">
			</fieldset>
		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

	class BoxBps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("formBps").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			var theDataSource = this.getDataSource();
			console.log(theDataSource.getVariables());
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							color: this.color,
							value: this.value,
							value: this.price
						}
					}
			}));
		}

		set color(newColor) {
			this._shadowRoot.getElementById("bps_color").value = newColor;
		}

		get color() {
			return this._shadowRoot.getElementById("bps_color").value;
		}

		set value(newValue) {
			this._shadowRoot.getElementById("bps_value").value = newValue;
		}

		get value() {
			return this._shadowRoot.getElementById("bps_value").value;
		}

		set price(newPrice) {
			this._shadowRoot.getElementById("bps_value").value = newPrice;
		}

		get price() {
			return this._shadowRoot.getElementById("bps_value").value;
		}
	}

	customElements.define("com-demo-box-bps", BoxBps);
})();