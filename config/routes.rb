Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "home#index"

  namespace :api do
    resources :registrations, only: %i[create]
    resources :sessions, only: %i[create destroy]
    resources :health_check, only: %i[index]

    resources :classroom, only: %i[index] do
      get '/quote', action: 'quote'
      get '/resources', action: 'resources'
      post '/resources', action: 'create_resource'
      get '/:resource_id/comments', action: 'comments'
      post '/:resource_id/comments', action: 'add_comment'
    end
  end

  get "*any" => "home#index"
end
