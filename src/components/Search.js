import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends React.Component {
    state = {
        focused: false
    }
    render() {
        

        return (
            <section className="search">
                <div className="search_input d-flex">
                    <FontAwesomeIcon icon={faSearch} flip="horizontal" size="lg"/>
                    <input 
                        type="search" 
                        name="search" 
                        placeholder={!this.state.focused && "your Movie Name ..."} 
                        autoComplete="off"
                        onChange={(e) => {
                                const text = e.target.value;
                                this.props.hanldeChangeInput(text);
                            }
                        }
                        onFocus={() => {
                            this.setState(() => ({focused: true}));
                        }}
                        onBlur={(e) => {
                            if (e.target.value === "") {
                                this.setState(() => ({focused: false}));
                            }
                            
                        }}
                    />
                </div>
            </section>
        );
    }
};

export default Search;