import { AdminLayout } from "@/components/Layout/AdminLayout";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import { postData } from "@/services/FetchNodeServices";

const CreateCity = () => {
  const [countries, setCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedState, setSelectedState] = useState("");

  const [searchState, setSearchState] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    state: "",
    badge: "",
    pinCode:'',
    image: null,
    color: "#9b87f5",
    topCity: false,
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setCountries(Country.getAllCountries());
    setAllStates(State.getStatesOfCountry(selectedCountry));
    setAllCities([]);
    setSelectedState("");
    setFormData((prev) => ({ ...prev, state: "", name: "" }));
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const cities = City.getCitiesOfState(selectedCountry, selectedState);
      setAllCities(cities);
    }
  }, [selectedState]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("state", formData.state);
    form.append("badge", formData.badge);
    form.append("color", formData.color);
    form.append("pinCode", formData.pinCode);
    form.append("topCity", formData.topCity.toString());
    form.append("isActive", formData.isActive.toString());
    if (formData.image) form.append("image", formData?.image);

    try {
      const res = await postData("city/create-city", form);
      if (res.status === true) {
        toast({ title: "City Created", description: `${formData.name}, ${formData.state} has been created.`, });
        navigate("/admin/cities");
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create city.",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredStates = allStates.filter((s) =>
    s.name.toLowerCase().includes(searchState.toLowerCase())
  );

  const filteredCities = allCities.filter((c) =>
    c.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <AdminLayout title="Create City">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Create New City</h1>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Country Selector */}
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <select
                    id="country"
                    className="w-full border rounded px-3 py-2"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State Selector */}
                <div className="space-y-2 relative">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="stateSearch"
                    value={searchState}
                    onChange={(e) => setSearchState(e.target.value)}
                    placeholder="Search state..."
                  />
                  {searchState && (
                    <ul className="absolute z-10 bg-white border rounded max-h-40 overflow-y-auto w-full">
                      {filteredStates.map((s) => (
                        <li
                          key={s.isoCode}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedState(s.isoCode);
                            setFormData((prev) => ({
                              ...prev,
                              state: s.name,
                            }));
                            setSearchState("");
                          }}
                        >
                          {s.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  {formData.state && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: <strong>{formData.state}</strong>
                    </p>
                  )}
                </div>

                {/* City Selector */}
                <div className="space-y-2 relative">
                  <Label htmlFor="city">City Name *</Label>
                  <Input
                    id="citySearch"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    placeholder="Search city..."
                  />
                  {searchCity && (
                    <ul className="absolute z-10 bg-white border rounded max-h-40 overflow-y-auto w-full">
                      {filteredCities.map((c, i) => (
                        <li
                          key={i}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, name: c.name }));
                            setSearchCity("");
                          }}
                        >
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  {formData.name && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: <strong>{formData.name}</strong>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badge">pinCode</Label>
                  <Input
                    id="pinCode"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    placeholder="pinCode"
                  />
                </div>

                {/* Badge */}
                <div className="space-y-2">
                  <Label htmlFor="badge">Badge Label</Label>
                  <Input
                    id="badge"
                    name="badge"
                    value={formData.badge}
                    onChange={handleChange}
                    placeholder="e.g. Popular, New"
                  />
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <Label htmlFor="color">Theme Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      type="text"
                      value={formData.color}
                      onChange={handleChange}
                      name="color"
                      placeholder="#HEX Color"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleChange}
                  />
                  <p className="text-xs text-gray-500">Add city image</p>
                </div>

                {/* Active Checkbox */}
                <div className="flex items-center space-x-2 h-full">
                  <input
                    type="checkbox"
                    id="topCity"
                    name="topCity"
                    checked={formData.topCity}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="topCity">Top City</Label>
                </div>
                <div className="flex items-center space-x-2 h-full">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isActive">isActive</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => navigate("/admin/cities")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create City"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CreateCity;
